import axios from "axios";
import { prisma } from "./prisma.server";

export const handleRegistration = async (
  body: WhatsappMessageRequest,
  senderPhoneNumber: string
) => {
  // check if the sent message matches the access code in the database
  const accessCode = body.entry[0].changes[0].value.messages[0].text?.body;
  const userIdByAccessCode = (
    await prisma.user.findUnique({
      where: {
        accessCode: accessCode,
      },
    })
  )?.id;

  console.log("userIdByAccessCode:", userIdByAccessCode);

  if (userIdByAccessCode !== undefined) {
    await prisma.user.update({
      where: {
        id: userIdByAccessCode,
      },
      data: {
        phoneNumber: senderPhoneNumber,
      },
    });
    console.log("Updated user phone number");
    await axios.post(
      `https://graph.facebook.com/v19.0/${body.entry[0].changes[0].value.metadata.phone_number_id}/messages`,
      {
        messaging_product: "whatsapp",
        to: senderPhoneNumber,
        type: "text",
        text: {
          body: "You have successfully signed up. Please send your odometer reading.",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Sent sign up success message");
    return { body: "OK", status: 200 };
  } else {
    // ask the sender to sign up by access code
    await axios.post(
      `https://graph.facebook.com/v19.0/${body.entry[0].changes[0].value.metadata.phone_number_id}/messages`,
      {
        messaging_product: "whatsapp",
        to: senderPhoneNumber,
        type: "text",
        text: {
          body: "Please sign up by replying your access code.",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Sent sign up message");
    return { body: "OK", status: 200 };
  }
};
