import axios from "axios";
import { prisma } from "./prisma.server";
import { HandleRequestPayload } from "./types.server";
import { sendWhatsAppMessageText } from "~/utils/sendWhatsAppMessage";
import { json } from "@remix-run/node";
import { v4 } from "uuid";

export const handleRegistration = async (payload: HandleRequestPayload) => {
  // check if the sent message matches the access code in the database
  const accessCode = payload.message!.replace("REGISTER ", "");
  const userIdByAccessCode = (
    await prisma.user.findUnique({
      where: {
        accessCode: accessCode,
      },
    })
  )?.id;

  console.log("userIdByAccessCode:", userIdByAccessCode);

  const userIdByPhoneNumber = (
    await prisma.user.findUnique({
      where: {
        phoneNumber: payload.phoneNumber,
      },
    })
  )?.id;

  console.log("userIdByPhoneNumber:", userIdByPhoneNumber);

  if (userIdByAccessCode !== undefined) {
    if (userIdByPhoneNumber !== undefined) {
      const message = "You have already signed up with this phone number.";

      sendWhatsAppMessageText(
        payload.ourPhoneNumber,
        payload.phoneNumber,
        message
      );

      return { body: "OK", status: 200 };
    } else {
      await prisma.user.update({
        where: {
          id: userIdByAccessCode,
        },
        data: {
          phoneNumber: payload.phoneNumber,
          userStatusId: "activated",
        },
      });

      const message =
        "You have successfully signed up. Please send your odometer reading.";

      sendWhatsAppMessageText(
        payload.ourPhoneNumber,
        payload.phoneNumber,
        message
      );
      return { body: "OK", status: 200 };
    }
  } else {
    // ask the sender to sign up by access code
    const message = `Please use the command "REGISTER {access code}", replacing {access code} with the unique access code sent in your invitation email.
Please note that the command is case-sensitive.`;

    sendWhatsAppMessageText(
      payload.ourPhoneNumber,
      payload.phoneNumber,
      message
    );

    console.log("Sent sign up message");
    return { body: "OK", status: 200 };
  }
};

export const handleDelete = async (payload: HandleRequestPayload) => {
  const imageId = payload.message!.replace("DELETE ", "");

  if (isNaN(Number(imageId))) {
    const message = `Invalid image name has been entered. Please check the image name and try it again.`;

    sendWhatsAppMessageText(
      payload.ourPhoneNumber,
      payload.phoneNumber,
      message
    );

    return { body: "OK", status: 200 };
  }

  const count = await prisma.post.updateMany({
    where: {
      AND: [
        {
          name: {
            equals: Number(imageId),
          },
        },
        {
          postedBy: {
            phoneNumber: {
              equals: payload.phoneNumber,
            },
          },
        },
        {
          size: {
            gt: 0,
          },
        },
      ],
    },
    data: {
      image: Buffer.from(""),
      size: 0,
    },
  });

  if (count.count === 0) {
    const message = `No image has been deleted. This could be because you already deleted the image or you entered a wrong image name.`;

    sendWhatsAppMessageText(
      payload.ourPhoneNumber,
      payload.phoneNumber,
      message
    );

    return { body: "OK", status: 200 };
  } else {
    const message = `Thank you, we have successfully deleted image "${imageId}".`;

    sendWhatsAppMessageText(
      payload.ourPhoneNumber,
      payload.phoneNumber,
      message
    );

    return { body: "OK", status: 200 };
  }
};

export const handleStop = async (payload: HandleRequestPayload) => {
  if (payload.user?.userStatusId === "activated") {
    if (payload.message === `STOP ${payload.user.accessCode}`) {
      await prisma.user.update({
        where: {
          id: payload.user.id,
        },
        data: {
          userStatusId: "closed",
        },
      });

      const message = `We have successfully closed your account. Thank you so much for your participation in our study.`;

      sendWhatsAppMessageText(
        payload.ourPhoneNumber,
        payload.phoneNumber,
        message
      );

      return { body: "OK", status: 200 };
    } else if (
      payload.message === `STOP AND DELETE ${payload.user.accessCode}`
    ) {
      await prisma.user.update({
        where: {
          id: payload.user.id,
        },
        data: {
          userStatusId: "deleted",
          posts: {
            updateMany: {
              where: {
                postedById: payload.user.id,
              },
              data: {
                image: Buffer.from(""),
              },
            },
          },
        },
      });

      const message = `We have successfully closed your account and deleted all the image data submitted by you. Thank you so much for your participation in our study.`;

      sendWhatsAppMessageText(
        payload.ourPhoneNumber,
        payload.phoneNumber,
        message
      );

      return { body: "OK", status: 200 };
    } else {
      const message = `Please use one of the two commands to close your account, replacing {access code} with the unique access code sent in your invitation email:
  
  1. "STOP {access code}" to close your account.
  2. "STOP AND DELETE {access code}" to close your account and delete all image data.
  
  Please note that *closing your account cannot be undone*.`;

      sendWhatsAppMessageText(
        payload.ourPhoneNumber,
        payload.phoneNumber,
        message
      );

      return { body: "OK", status: 200 };
    }
  }
};

export const handleHelp = async (payload: HandleRequestPayload) => {
  const message = `You can submit a photo image of your odometer by attaching it directly to this chat.
For other actions, please use one of the following commands:

1. DELETE - To delete image(s) that you already submitted.
2. STOP - To stop participating in this survey.`;

  sendWhatsAppMessageText(payload.ourPhoneNumber, payload.phoneNumber, message);

  return { body: "OK", status: 200 };
};

export const handleReset = async (payload: HandleRequestPayload) => {
  if (!payload.user) {
    return json({ body: "No user found", status: 400 });
  }

  await prisma.user.update({
    where: {
      id: payload.user.id,
    },
    data: {
      userStatusId: "initialized",
      phoneNumber: v4(),
    },
  });

  const message =
    "Admin command of resetting the user has been executed. You can now use your phone number again.";

  sendWhatsAppMessageText(payload.ourPhoneNumber, payload.phoneNumber, message);

  return json({ body: "OK", status: 200 });
};
