import axios from "axios";
import { prisma } from "./prisma.server";

export const makeUserComplete = async (user: {
  id: string;
  phoneNumber: string;
}) => {
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      userStatusId: "completed",
    },
  });

  const ourPhoneNumber = process.env.OUR_PHONE_NUMBER;

  if (user.phoneNumber.includes("TEST")) {
    return;
  }

  axios.post(
    `https://graph.facebook.com/v19.0/${ourPhoneNumber}/messages`,
    {
      messaging_product: "whatsapp",
      to: user.phoneNumber,
      type: "template",
      template: {
        name: "make_user_completed",
        language: {
          code: "en_US",
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
};
