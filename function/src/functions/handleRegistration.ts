import { ApolloClient, NormalizedCacheObject, gql } from "@apollo/client";
import { InvocationContext } from "@azure/functions";
import axios from "axios";

export const handleRegistration = async (
  body: WhatsappMessageRequest,
  senderPhoneNumber: string,
  context: InvocationContext,
  client: ApolloClient<NormalizedCacheObject>
) => {
  // check if the sent message matches the access code in the database
  const accessCode = body.entry[0].changes[0].value.messages[0].text.body;
  const userIdByAccessCode = (
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
          accessCode: accessCode,
        },
      },
    })
  ).data?.findUniqueUser?.id;

  context.log("userIdByAccessCode:", userIdByAccessCode);

  if (userIdByAccessCode !== undefined) {
    await client.mutate({
      mutation: gql`
        mutation UpdateOneUser(
          $data: UserUpdateInput!
          $where: UserWhereUniqueInput!
        ) {
          updateOneUser(data: $data, where: $where) {
            id
          }
        }
      `,
      variables: {
        where: {
          id: userIdByAccessCode,
        },
        data: {
          phoneNumber: {
            set: senderPhoneNumber,
          },
        },
      },
    });
    context.log("Updated user phone number");
    await axios.post(
      `https://graph.facebook.com/v19.0/${body.entry[0].changes[0].value.metadata.phone_number_id}/messages`,
      {
        messaging_product: "whatsapp",
        to: senderPhoneNumber,
        type: "text",
        text: {
          body: "You have successfully signed up. Please send your odometer reading.",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    context.log("Sent sign up success message");
    return { body: "OK", status: 200 };
  } else {
    // ask the sender to sign up by access code
    await axios.post(
      `https://graph.facebook.com/v19.0/${body.entry[0].changes[0].value.metadata.phone_number_id}/messages`,
      {
        messaging_product: "whatsapp",
        to: senderPhoneNumber,
        type: "text",
        text: {
          body: "Please sign up by replying your access code.",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    context.log("Sent sign up message");
    return { body: "OK", status: 200 };
  }
};
