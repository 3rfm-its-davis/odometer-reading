import axios from "axios";

export const sendApprovalTemplateMessage = async (
  userPhoneNumber: string,
  imageId: string
) => {
  const ourPhoneNumber = process.env.OUR_PHONE_NUMBER;
  await axios.post(
    `https://graph.facebook.com/v19.0/${ourPhoneNumber}/messages`,
    {
      messaging_product: "whatsapp",
      to: userPhoneNumber,
      type: "template",
      template: {
        name: "reading_approved",
        language: {
          code: "en",
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: imageId,
              },
            ],
          },
        ],
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return userPhoneNumber;
};

export const sendRejectionTemplateMessage = async (
  userPhoneNumber: string,
  rejectionReason: string,
  imageId: string
) => {
  const ourPhoneNumber = process.env.OUR_PHONE_NUMBER;
  await axios.post(
    `https://graph.facebook.com/v19.0/${ourPhoneNumber}/messages`,
    {
      messaging_product: "whatsapp",
      to: userPhoneNumber,
      type: "template",
      template: {
        name: "reading_rejected",
        language: {
          code: "en",
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: imageId,
              },
              {
                type: "text",
                text: rejectionReason,
              },
            ],
          },
        ],
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return userPhoneNumber;
};
