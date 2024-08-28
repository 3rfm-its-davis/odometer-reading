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

  // _todo validate it is an image format
  // _todo validate image size is not more than 10mb(environment variable)

  const randomNumber = Math.random();

  // register image buffer to the database
  prisma.post
    .create({
      data: {
        image: imageBuffer,
        postStatus: {
          connect: {
            id:
              randomNumber < 0.4
                ? "submitted"
                : randomNumber < 0.6
                ? "read"
                : randomNumber < 0.8
                ? "approved"
                : "rejected",
          },
        },
        postedBy: {
          connect: {
            id: user.id,
          },
        },
        size: imageBuffer.length,
        notes: message,
      },
    })
    .then((response) => {
      // _todo: pad "IMG" instead of 0 filling
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
Rewards, if applicable, will be processed after the project is complete.

If you want to delete this image please use the command "DELETE ${name}".`,
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
