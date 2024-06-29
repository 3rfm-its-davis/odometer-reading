import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import axios from "axios";
import { client } from "../apollo";
import { gql } from "@apollo/client";
import { handleRegistration } from "./handleRegistration";

require("dotenv").config();

export async function whatsappMessageReceiver(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  if (process.env.VERIFY_TOKEN === request.query.get("hub.verify_token")) {
    context.log("Validating webhook");
    return {
      body: request.query.get("hub.challenge"),
      status: 200,
    };
  }

  const str = await request.text();
  const body: WhatsappMessageRequest = JSON.parse(str);

  context.log("Body: ", JSON.stringify(body));

  let senderPhoneNumber: string = "";
  try {
    senderPhoneNumber = body.entry[0].changes[0].value.contacts[0].wa_id;
  } catch (error) {
    context.log("No sender found");
    return { body: "No sender found", status: 400 };
  }

  const userId = (
    await client.query({
      query: gql`
        query FindUniqueUser($findUniqueUserWhere: UserWhereUniqueInput!) {
          findUniqueUser(where: $findUniqueUserWhere) {
            id
          }
        }
      `,
      variables: {
        findUniqueUserWhere: {
          phoneNumber: senderPhoneNumber,
        },
      },
    })
  ).data?.findUniqueUser?.id;

  context.log("userId: ", userId);

  if (userId === undefined) {
    context.log("User not found");
    return await handleRegistration(body, senderPhoneNumber, context, client);
  }

  let imageId;
  try {
    imageId = body.entry[0].changes[0].value.messages[0].image?.id;
  } catch (error) {
    context.log("No image found");
    return { body: "No image found", status: 200 };
  }

  if (imageId === undefined) {
    context.log("No image found");
    return { body: "No image found", status: 200 };
  }

  const imageUrl = (
    await axios.get(`https://graph.facebook.com/v19.0/${imageId}`, {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
      },
    })
  ).data.url;

  const imageBuffer: number[] = [
    ...Buffer.from(
      (
        await axios.get(imageUrl, {
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
          },
          responseType: "text",
        })
      ).data
    ),
  ];

  // log Apollo client endpoint
  context.log("Apollo client endpoint: ", client.link);

  // register image buffer to the database
  client
    .mutate({
      mutation: gql`
        mutation CreateOnePost($data: PostCreateInput!) {
          createOnePost(data: $data) {
            id
          }
        }
      `,
      variables: {
        data: {
          image: imageBuffer,
          postStatus: {
            connect: {
              id: "submitted",
            },
          },
          postedBy: {
            connect: {
              id: userId,
            },
          },
        },
      },
    })
    .then((response) => {
      context.log("Post created", response);
      // reply to the user for confirmation
      axios.post(
        `https://graph.facebook.com/v19.0/${body.entry[0].changes[0].value.metadata.phone_number_id}/messages`,
        {
          messaging_product: "whatsapp",
          to: senderPhoneNumber,
          type: "text",
          text: {
            body: "Your image has been received. We will confirm your submission shortly.",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
    });

  return { body: "OK", status: 200 };
}

app.http("whatsappMessageReceiver", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: whatsappMessageReceiver,
});
