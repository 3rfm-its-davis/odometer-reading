import crypto from "node:crypto";

import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== "POST") {
    return json({ message: "Method not allowed" }, 405);
  }

  const secret = process.env.WHATSAPP_WEBHOOK_SECRET;

  if (!secret) {
    return json({ message: "Secret not set" }, 500);
  }

  if (!request.body) {
    return json({ message: "No body provided" }, 400);
  }

  const bodyData = await request.text();
  const parsedBody = JSON.parse(bodyData);
  console.log("Parsed body: ", JSON.stringify(parsedBody));
  const verifyToken = parsedBody["hub.verify_token"];

  if (secret !== verifyToken) {
    return json({ message: "Verify token mismatch" }, 401);
  }

  return json({ body: parsedBody["hub.challenge"] }, 200);
};
