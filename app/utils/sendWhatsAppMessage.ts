import axios from "axios";

export const sendWhatsAppMessageText = async (
  phoneNumber: string,
  message: string
) => {
  const ourPhoneNumber = process.env.OUR_PHONE_NUMBER;
  return await axios.post(
    `https://graph.facebook.com/v19.0/${ourPhoneNumber}/messages`,
    {
      messaging_product: "whatsapp",
      to: phoneNumber,
      type: "text",
      text: {
        body: message,
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
