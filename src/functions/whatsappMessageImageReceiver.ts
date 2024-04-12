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

  return { body: `Hello, ${name}!` };
}

app.http("whatsappMessageImageReceiver", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: whatsappMessageImageReceiver,
});
