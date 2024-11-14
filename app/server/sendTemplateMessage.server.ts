import axios from "axios";

// export const sendApprovalTemplateMessage = async (
//   userPhoneNumber: string,
//   imageId: string,
//   days: string
// ) => {
//   const ourPhoneNumber = process.env.OUR_PHONE_NUMBER;

//   if (userPhoneNumber.includes("TEST")) {
//     return userPhoneNumber;
//   }

//   await axios.post(
//     `https://graph.facebook.com/v19.0/${ourPhoneNumber}/messages`,
//     {
//       messaging_product: "whatsapp",
//       to: userPhoneNumber,
//       type: "template",
//       template: {
//         name: "approve_post",
//         language: {
//           code: "en_US",
//         },
//         components: [
//           {
//             type: "body",
//             parameters: [
//               {
//                 type: "text",
//                 text: imageId,
//               },
//               {
//                 type: "text",
//                 text: days,
//               },
//             ],
//           },
//         ],
//       },
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   return userPhoneNumber;
// };

export const sendTemplateMessage = async (
  userPhoneNumber: string,
  templateName: string,
  parameters?: string[]
) => {
  const ourPhoneNumber = process.env.OUR_PHONE_NUMBER;

  if (userPhoneNumber.includes("TEST")) {
    return userPhoneNumber;
  }

  await axios.post(
    `https://graph.facebook.com/v19.0/${ourPhoneNumber}/messages`,
    {
      messaging_product: "whatsapp",
      to: userPhoneNumber,
      type: "template",
      template: {
        name: templateName,
        language: {
          code: "en_US",
        },
        components:
          parameters && parameters.length > 0
            ? [
                {
                  type: "body",
                  parameters: parameters.map((parameter) => ({
                    type: "text",
                    text: parameter,
                  })),
                },
              ]
            : undefined,
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
