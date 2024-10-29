import { json } from "@remix-run/node";
import { v4 } from "uuid";
import { sendWhatsAppMessageText } from "~/utils/sendWhatsAppMessage";
import { prisma } from "./prisma.server";
import { HandleRequestPayload } from "./types.server";

export const handleRegistration = async (payload: HandleRequestPayload) => {
  // check if the sent message matches the access code in the database
  // _todo: change this to something with split()
  const accessCode = payload.message!.split(" ").slice(1).join(" ");
  const userIdByAccessCode = (
    await prisma.user.findUnique({
      where: {
        accessCode: accessCode,
      },
    })
  )?.id;

  console.log(
    "handleRegistration: AccessCode: ",
    accessCode,
    " Related User: ",
    userIdByAccessCode
  );

  if (userIdByAccessCode === undefined) {
    const message = `Please use the command "REGISTER {access code}", replacing {access code} with the unique access code sent in your invitation email.`;

    sendWhatsAppMessageText(payload.phoneNumber, message);

    console.log("Sent sign up message");
    return { body: "OK", status: 200 };
  }

  const userIdByPhoneNumber = (
    await prisma.user.findUnique({
      where: {
        phoneNumber: payload.phoneNumber,
      },
    })
  )?.id;

  if (userIdByPhoneNumber !== undefined) {
    const message = "You have already signed up with this phone number.";

    sendWhatsAppMessageText(payload.phoneNumber, message);

    return { body: "OK", status: 200 };
  } else {
    await prisma.user.update({
      where: {
        id: userIdByAccessCode,
      },
      data: {
        phoneNumber: payload.phoneNumber,
        userStatusId: "activated",
        activatedAt: new Date(),
      },
    });

    const message = `Thank you for registering! We're excited to have you on board for our study, 'Collecting Odometer Pictures via WhatsApp to Measure Precise Vehicle Miles Traveled.' Your participation is essential, and we truly appreciate your involvement in this exciting project.

To get started, please send us a picture of your current odometer reading at your convenience.`;

    sendWhatsAppMessageText(payload.phoneNumber, message);
    return { body: "OK", status: 200 };
  }
};

export const handleDelete = async (payload: HandleRequestPayload) => {
  const imageId = payload.message?.replace("DELETE ", "");

  const result = await prisma.post.updateMany({
    where: {
      id: payload.user!.accessCode + "-" + imageId,
    },
    data: {
      image: Buffer.from(""),
      size: 0,
    },
  });

  if (result.count === 0) {
    const message = `No image has been deleted. This could be because you already deleted the image or you input an invalid image name.`;

    sendWhatsAppMessageText(payload.phoneNumber, message);

    return { body: "OK", status: 200 };
  } else {
    const message = `Thank you, we have successfully deleted the image ${imageId}.`;

    sendWhatsAppMessageText(payload.phoneNumber, message);

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
          deletedAt: new Date(),
        },
      });

      const message = `We have successfully closed your account. Thank you so much for your participation in our study.`;

      sendWhatsAppMessageText(payload.phoneNumber, message);

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
          deletedAt: new Date(),
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

      sendWhatsAppMessageText(payload.phoneNumber, message);

      return { body: "OK", status: 200 };
    } else {
      const message = `Invalid command or access code has been entered.
Please use one of the two commands to close your account, replacing {access code} with the unique access code sent in your invitation email:

1. "STOP {access code}" to close your account.
2. "STOP AND DELETE {access code}" to close your account and delete all image data.

Please note that *closing your account cannot be undone*.`;

      sendWhatsAppMessageText(payload.phoneNumber, message);

      return { body: "OK", status: 200 };
    }
  }
};

export const handleHelp = async (payload: HandleRequestPayload) => {
  // _todo: change this to something with split()
  const message = `You can submit a photo image of your odometer by attaching it directly to this chat.
For other actions, please use one of the following commands:

1. DELETE {image name} - To delete an image that you already submitted.
2. STOP {access code} - To stop participating in this survey. Please replace {access code} with the unique access code sent in your invitation email.
3. STOP AND DELETE {access code} - To stop participating in this survey and delete all the image data that you have submitted. Please replace {access code} with the unique access code sent in your invitation email.`;

  sendWhatsAppMessageText(payload.phoneNumber, message);

  return { body: "OK", status: 200 };
};

export const handleReset = async (payload: HandleRequestPayload) => {
  if (!payload.user) {
    return json({ body: "No user found", status: 400 });
  }

  await prisma.post.deleteMany({
    where: {
      postedById: payload.user.id,
    },
  });

  await prisma.message.deleteMany({
    where: {
      sentById: payload.user.id,
    },
  });

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

  sendWhatsAppMessageText(payload.phoneNumber, message);

  return json({ body: "OK", status: 200 });
};
