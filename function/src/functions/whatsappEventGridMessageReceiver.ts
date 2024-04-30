import { app, EventGridEvent, InvocationContext } from "@azure/functions";

export async function whatsappEventGridMessageReceiver(
  event: EventGridEvent,
  context: InvocationContext
): Promise<void> {
  context.log("Event grid function processed event:", event);
}

app.eventGrid("whatsappEventGridMessageReceiver", {
  handler: whatsappEventGridMessageReceiver,
});
