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
    if (request.body) {
      const reader = request.body.getReader();
      const decoder = new TextDecoder();
      let value = await reader.read();
      while (!value.done) {
        const chunk = decoder.decode(value.value, { stream: true });
        context.log(chunk);
        value = await reader.read();
      }
    }

  return { body: request.query.get("hub.challenge") };
}

app.http("whatsappMessageImageReceiver", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: whatsappMessageImageReceiver,
});
