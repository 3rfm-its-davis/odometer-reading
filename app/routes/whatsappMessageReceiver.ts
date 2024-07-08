import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

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
