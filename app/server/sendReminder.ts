import { prisma } from "./prisma.server";
import axios from "axios";

export const sendReminder = async (users: any[]) => {
  const ourPhoneNumber = process.env.OUR_PHONE_NUMBER;
  const newUsers = users.map(async (user) => {
    await axios.post(
      `https://graph.facebook.com/v19.0/${ourPhoneNumber}/messages`,
      {
        messaging_product: "whatsapp",
        to: user.phoneNumber,
        type: "template",
        template: {
          name: "odometer_reminder",
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
    const newUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        updatedAt: new Date().toISOString(),
      },
    });

    console.log(newUser);

    return {
      ...user,
      updatedAt: newUser.updatedAt,
      lastActivityAt: newUser.updatedAt,
    };
  });

  return Promise.all(newUsers);
};
