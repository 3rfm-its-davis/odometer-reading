import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe") {
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
    const verifyToken = token;

    if (secret !== verifyToken) {
      return json({ message: "Verify token mismatch" }, 401);
    }

    return json(challenge, 200);
  }
  return json({ message: "Invalid request" }, 400);
};
