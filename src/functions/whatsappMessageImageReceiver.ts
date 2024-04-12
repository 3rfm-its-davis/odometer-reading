import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

export async function whatsappMessageImageReceiver(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(request);

  const name = request.query.get("name") || (await request.text()) || "world";

  return { body: request.query.get("hub.challenge") };
}

app.http("whatsappMessageImageReceiver", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: whatsappMessageImageReceiver,
});
