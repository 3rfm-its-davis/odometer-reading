import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  TypedResponse,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { prisma } from "~/server/prisma.server";
import {
  handleDelete,
  handleHelp,
  handleRegistration,
  handleReset,
  handleStop,
} from "~/server/handleRequests.server";
import { HandleRequestPayload } from "~/server/types.server";
import { postImage } from "~/server/postImage.server";
import { sendWhatsAppMessageText } from "~/utils/sendWhatsAppMessage";

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

const getBody = async (request: Request) => {
  const body = JSON.parse(await request.text());

  console.log("Body: ", JSON.stringify(body));

  return body;
};

const getPhoneNumber = async (body: any) => {
  let phoneNumber: string | null = null;
  try {
    phoneNumber = body.entry[0].changes[0].value.contacts[0].wa_id;
  } catch (error) {
    return phoneNumber;
  }

  return phoneNumber;
};

const getOurPhoneNumber = async (body: any) => {
  let phoneNumber: string | null = null;
  try {
    phoneNumber = body.entry[0].changes[0].value.metadata.phone_number_id;
  } catch (error) {
    return phoneNumber;
  }

  return phoneNumber;
};

const getUser = async (phoneNumber: string) => {
  const userId = await prisma.user.findUnique({
    where: {
      phoneNumber: phoneNumber,
    },
  });

  return userId;
};

const getImageId = async (body: any) => {
  let imageId: string | null = null;
  try {
    imageId = body.entry[0].changes[0].value.messages[0].image?.id;
  } catch (error) {
    return imageId;
  }

  return imageId;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== "POST") {
    return json({ message: "Invalid request method" }, 400);
  }
  const body = await getBody(request);

  if (!body) {
    return json({ message: "Invalid request body" }, 400);
  }

  const phoneNumber = await getPhoneNumber(body);
  const ourPhoneNumber = await getOurPhoneNumber(body);

  if (!phoneNumber) {
    return json({ message: "Invalid phone number" }, 400);
  }

  if (!ourPhoneNumber) {
    return json({ message: "The system is temporarily unavailable" }, 503);
  }

  const user = await getUser(phoneNumber);

  console.log("userId: ", user?.id);

  const message = body.entry[0].changes[0].value.messages[0].text?.body.trim();
  const messageType = String((message || "").split(" ")[0]).toUpperCase();
  const messageId = body.entry[0].changes[0].value.messages[0].id || null;

  const repliedTo =
    body.entry[0].changes[0].value.messages[0].context?.id || null;

  const imageId = await getImageId(body);

  const payload: HandleRequestPayload = {
    user,
    imageId,
    message,
    phoneNumber,
    messageId,
    repliedTo,
  };

  if (messageType === "RESET") {
    return await handleReset(payload);
  }

  if (user?.userStatusId === "closed" || user?.userStatusId === "deleted") {
    const message = `Your account is closed or deleted.`;

    sendWhatsAppMessageText(payload.phoneNumber, message);
    return { body: "User closed or deleted", status: 403 };
  }

  if (!user) {
    if (messageType == "REGISTER") {
      return await handleRegistration(payload);
    } else {
      return json({ body: "No user", status: 403 });
    }
  }

  if (imageId && user) {
    await postImage(payload);
    return json({ body: "OK", status: 200 });
  }

  prisma.message.create({
    data: {
      id: messageId,
      message: message,
      sentById: user.id,
    },
  });

  switch (messageType) {
    case "REGISTER":
      // deleting images
      return await handleRegistration(payload);
    case "DELETE":
      // deleting images
      return await handleDelete(payload);
    case "STOP":
      // do some branching in this
      // 1. out-put stop
      // 2. full stop with all the images deleted "STOP {access code}"
      return await handleStop(payload);
    // case "GRIEVANCE":
    //   // complaint string
    //   // stack it to the grievance table
    //   return { body: "OK", status: 200 };
    case "HELP":
      return await handleHelp(payload);
    default:
      // return user to submit something else
      return { body: "OK", status: 200 };
  }
};
