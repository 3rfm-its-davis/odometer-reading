import axios from "axios";
import { prisma } from "./prisma.server";
import { HandleRequestPayload } from "./types.server";
import { sendWhatsAppMessageText } from "~/utils/sendWhatsAppMessage";

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
    // check if the user's phone number is number or string
    // if it is string
    // check if the sender's phone number already exists
    //// if yes, reply "the phone number is already used" message
    //// if not, update the user's phone number and reply success message
    // if not string, reply "the access code is already used" message

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
      console.log("Updated user phone number");

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
    const message = `Please use the command "REGISTER {access code}", replacing {access code} with your unique access code in the invitation letter, to register.
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
  const imageIds = payload
    .message!.replace("DELETE ", "")
    .split(",")
    .map((item) => Number(item));

  const count = await prisma.post.updateMany({
    where: {
      AND: [
        {
          name: {
            in: imageIds,
          },
        },
        {
          postedBy: {
            phoneNumber: {
              equals: payload.phoneNumber,
            },
          },
        },
      ],
    },
    data: {
      image: Buffer.from(""),
    },
  });

  const message = `Thank you, we have successfully deleted ${count.count} images.`;

  sendWhatsAppMessageText(payload.ourPhoneNumber, payload.phoneNumber, message);

  return { body: "OK", status: 200 };
};

export const handleStop = async (payload: HandleRequestPayload) => {
  if (payload.user?.userStatusId === "activated") {
    await prisma.user.update({
      where: {
        id: payload.user.id,
      },
      data: {
        userStatusId: "stopping",
      },
    });

    const message = `You are going to cancel your participation in our study.
Please use one of the command to proceed:
1. "STOP CONFIRM" to confirm cancellation.
2. "STOP {access code}", replacing {access code} with your unique access code in the invitation letter, to confirm cancellation and delete all the image data uploaded to our system.
3. "STOP BACK" to undo this action and stay in our study.

**Cancellation of participation cannot be undone**, meaning that you will never be able to come back again to our study.
If you delete all the image data, you will no longer be eligible to redeem gift card balance that are not paid out yet.`;

    sendWhatsAppMessageText(
      payload.ourPhoneNumber,
      payload.phoneNumber,
      message
    );

    return { body: "OK", status: 200 };
  } else if (payload.user?.userStatusId === "stopped") {
    if (payload.message === "STOP CONFIRM") {
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
    } else if (payload.message === `STOP ${payload.user.accessCode}`) {
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
    } else if (payload.message === "STOP BACK") {
      await prisma.user.update({
        where: {
          id: payload.user.id,
        },
        data: {
          userStatusId: "activated",
        },
      });

      const message = `Thank you, we have put you back in our study now.`;

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
