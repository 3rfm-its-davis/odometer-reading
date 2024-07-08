import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import axios from "axios";
import { request } from "express";
import { prisma } from "~/server/prisma.server";
import { handleRegistration } from "~/server/user.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe") {
    const secret = process.env.WHATSAPP_WEBHOOK_SECRET;

    if (!secret) {
      return json({ message: "Secret not set" }, 500);
    }

    const verifyToken = token;

    if (secret !== verifyToken) {
      return json({ message: "Verify token mismatch" }, 401);
    }

    return json(Number(challenge), 200);
  }
  return json({ message: "Invalid request" }, 400);
};

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== "POST") {
    return json({ message: "Invalid request method" }, 400);
  }

  const body = JSON.parse(await request.text());

  if (!body) {
    return json({ message: "Invalid request body" }, 400);
  }

  console.log("Body: ", JSON.stringify(body));

  let senderPhoneNumber: string = "";
  try {
    senderPhoneNumber = body.entry[0].changes[0].value.contacts[0].wa_id;
  } catch (error) {
    console.log("No sender found");
    return { body: "No sender found", status: 400 };
  }

  const userId = (
    await prisma.user.findUnique({
      where: {
        phoneNumber: senderPhoneNumber,
      },
    })
  )?.id;

  console.log("userId: ", userId);

  if (userId === undefined) {
    console.log("User not found");
    return await handleRegistration(body, senderPhoneNumber);
  }

  let imageId;
  try {
    imageId = body.entry[0].changes[0].value.messages[0].image?.id;
  } catch (error) {
    console.log("No image found");
    return { body: "No image found", status: 200 };
  }

  if (imageId === undefined) {
    console.log("No image found");
    return { body: "No image found", status: 200 };
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
            id: userId,
          },
        },
      },
    })
    .then((response) => {
      console.log("Post created", response);
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
};
