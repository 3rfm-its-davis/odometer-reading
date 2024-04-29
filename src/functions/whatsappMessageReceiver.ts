import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { analyzeImage } from "../utils/vision";
import axios from "axios";
require("dotenv").config();

export async function whatsappMessageReceiver(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const str = await request.text();
  context.log(request.query);
  context.log(request.query.get("hub.verify_token"));
  context.log(request.query.get("hub.challenge"));

  const body: any = JSON.parse(str);
  const imageId = body.entry[0].changes[0].value.messages[0].image.id;

  if (process.env.VERIFY_TOKEN === request.query.get("hub.verify_token")) {
    return {
      body: request.query.get("hub.challenge"),
      status: 200,
    };
  }

  if (!imageId) {
    return { body: "No image found", status: 200 };
  }

  axios
    .get(`https://graph.facebook.com/v19.0/${imageId}`, {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
      },
    })
    .then((response) => {
      axios
        .get(response.data.url, {
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
          },
          responseType: "arraybuffer",
        })
        .then((response) => {
          analyzeImage(response.data).then((odometerLines) => {
            if (odometerLines.length === 1) {
              axios.post(
                `https://graph.facebook.com/v19.0/${body.entry[0].changes[0].value.metadata.phone_number_id}/messages`,
                {
                  messaging_product: "whatsapp",
                  to: body.entry[0].changes[0].value.contacts[0].wa_id,
                  type: "interactive",
                  interactive: {
                    type: "button",
                    body: {
                      text: `Your odometer reading is ${odometerLines[0].text}. Is this correct?`,
                    },
                    action: {
                      buttons: [
                        {
                          type: "reply",
                          reply: {
                            id: "UNIQUE_BUTTON_ID_1",
                            title: "Yes",
                          },
                        },
                        {
                          type: "reply",
                          reply: {
                            id: "UNIQUE_BUTTON_ID_2",
                            title: "No",
                          },
                        },
                      ],
                    },
                  },
                },
                {
                  headers: {
                    Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
                    "Content-Type": "application/json",
                  },
                }
              );
            }
          });
        });
    });

  return { body: "OK", status: 200 };
}

app.http("whatsappMessageReceiver", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: whatsappMessageReceiver,
});
