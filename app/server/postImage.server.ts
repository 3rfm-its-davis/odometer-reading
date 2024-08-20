import axios from "axios";
import { prisma } from "./prisma.server";
import { User } from "@prisma/client";
import { json } from "@remix-run/node";

export const postImage = async (
  imageId: string,
  message: string,
  user: User,
  phoneNumber: string,
  ourPhoneNumber: string
) => {
  // validate user state to see if they can submit images
  if (user.userStatusId !== "activated") {
    // reply to the user for ineligibility
    axios.post(
      `https://graph.facebook.com/v19.0/${ourPhoneNumber}/messages`,
      {
        messaging_product: "whatsapp",
        to: phoneNumber,
        type: "text",
        text: {
          body: "We are sorry, but you are not eligible to submit images.",
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
    await axios.get(`https://graph.facebook.com/v19.0/${imageId}`, {
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

  // register image buffer to the database
  prisma.post
    .create({
      data: {
        image: imageBuffer,
        postStatus: {
          connect: {
            id: "submitted",
          },
        },
        postedBy: {
          connect: {
            id: user.id,
          },
        },
        notes: message,
      },
    })
    .then((response) => {
      const name = String(response.name).padStart(4, "0");
      console.log("Post created", response);
      // reply to the user for confirmation
      axios.post(
        `https://graph.facebook.com/v19.0/${ourPhoneNumber}/messages`,
        {
          messaging_product: "whatsapp",
          to: phoneNumber,
          type: "text",
          text: {
            body: `Thank you, the image ID "${name}" has been received.
Please use the command "DELETE ${name}" if you want to delete this image.
Rewards, if applicable, will be processed after image verification.`,
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
