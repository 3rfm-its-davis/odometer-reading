import { json } from "@remix-run/node";
import axios from "axios";
import { postImageToBlobContainer } from "~/utils/handleImageOnBlobContainer";
import { prisma } from "./prisma.server";
import { HandleRequestPayload } from "./types.server";

export const postImage = async (payload: HandleRequestPayload) => {
  const ourPhoneNumber = process.env.OUR_PHONE_NUMBER;
  // validate user state to see if they can submit images
  if (payload.user!.userStatusId !== "activated") {
    // reply to the user for ineligibility
    axios.post(
      `https://graph.facebook.com/v19.0/${ourPhoneNumber}/messages`,
      {
        messaging_product: "whatsapp",
        to: payload.phoneNumber!,
        type: "text",
        text: {
          body: "Your account has been suspended by the admin. No further image submission allowed.",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return json({ body: "Ineligible user submitting image", status: 403 });
  }

  const imageUrl = (
    await axios.get(`https://graph.facebook.com/v19.0/${payload.imageId!}`, {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
      },
    })
  ).data.url;

  const imageBuffer = Buffer.from(
    (
      await axios.get(imageUrl, {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
        },
        responseType: "arraybuffer",
      })
    ).data
  );

  const count =
    (await prisma.post.count({
      where: {
        postedBy: {
          id: payload.user!.id,
        },
      },
    })) + 1;

  const imageId = payload.user!.accessCode + "-IMG-" + count;

  const blobUrl = await postImageToBlobContainer(imageId, imageBuffer);

  prisma.post
    .create({
      data: {
        // id: payload.messageId!,
        id: payload.user!.accessCode + "-IMG-" + count,
        image: blobUrl,
        postStatus: {
          connect: {
            id: "submitted",
          },
        },
        postedBy: {
          connect: {
            id: payload.user!.id,
          },
        },
        size: imageBuffer.length,
        notes: payload.message,
      },
    })
    .then((response) => {
      axios.post(
        `https://graph.facebook.com/v19.0/${ourPhoneNumber}/messages`,
        {
          messaging_product: "whatsapp",
          to: payload.phoneNumber!,
          type: "text",
          text: {
            body: `Your image "${
              "IMG-" + count
            }" has been received. Our team will review the image for quality and reply to you soon. Thanks for your submission. 

If you want to delete this image, please use the command "DELETE ${
              "IMG-" + count
            }".`,
          },
          context: {
            message_id: payload.messageId,
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
};
