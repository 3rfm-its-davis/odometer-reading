import { json } from "@remix-run/node";
import { deleteImageFromBlobContainer } from "~/utils/handleImageOnBlobContainer";
import { sendWhatsAppMessageText } from "~/utils/sendWhatsAppMessage";
import { message } from "./messageConst";
import { prisma } from "./prisma.server";
import { HandleRequestPayload } from "./types.server";

export const handleRegistration = async (payload: HandleRequestPayload) => {
  const accessCode = payload.message!.split(" ").slice(1).join(" ");
  const userIdByAccessCode = (
    await prisma.user.findUnique({
      where: {
        accessCode: accessCode,
      },
    })
  )?.id;

  if (userIdByAccessCode === undefined) {
    sendWhatsAppMessageText(payload.phoneNumber, message("accessCodeNotFound"));

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
    sendWhatsAppMessageText(
      payload.phoneNumber,
      message("accessCodeAlreadyUsed")
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
        activatedAt: new Date(),
      },
    });

    sendWhatsAppMessageText(
      payload.phoneNumber,
      message("registrationCompleted")
    );
    return { body: "OK", status: 200 };
  }
};

export const handleDelete = async (payload: HandleRequestPayload) => {
  const imageId = payload.message?.replace("DELETE ", "");

  const image = await prisma.post.findFirstOrThrow({
    where: {
      id: payload.user!.accessCode + "-" + imageId,
    },
    select: {
      image: true,
    },
  });

  deleteImageFromBlobContainer(image.image);

  const result = await prisma.post.updateMany({
    where: {
      id: payload.user!.accessCode + "-" + imageId,
    },
    data: {
      image: "",
      size: 0,
    },
  });

  if (result.count === 0) {
    sendWhatsAppMessageText(payload.phoneNumber, message("imageNotFound"));

    return { body: "OK", status: 200 };
  } else {
    sendWhatsAppMessageText(
      payload.phoneNumber,
      message("imageDeleted", [imageId || ""])
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
          deletedAt: new Date(),
        },
      });

      sendWhatsAppMessageText(payload.phoneNumber, message("accountClosed"));

      return { body: "OK", status: 200 };
    } else if (
      payload.message === `STOP AND DELETE ${payload.user.accessCode}`
    ) {
      const imageBlobUrls = await prisma.post.findMany({
        where: {
          postedById: payload.user.id,
        },
        select: {
          image: true,
        },
      });

      imageBlobUrls.forEach((imageBlobUrl) => {
        deleteImageFromBlobContainer(imageBlobUrl.image);
      });

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
                image: "",
                size: 0,
              },
            },
          },
        },
      });

      sendWhatsAppMessageText(payload.phoneNumber, message("accountDeleted"));

      return { body: "OK", status: 200 };
    } else {
      sendWhatsAppMessageText(
        payload.phoneNumber,
        message("accountClosureCommandInvalid")
      );

      return { body: "OK", status: 200 };
    }
  }
};

export const handleHelp = async (payload: HandleRequestPayload) => {
  sendWhatsAppMessageText(payload.phoneNumber, message("help"));

  return { body: "OK", status: 200 };
};

export const handleReset = async (payload: HandleRequestPayload) => {
  // if (!payload.user) {
  //   return json({ body: "No user found", status: 400 });
  // }

  // await prisma.post.deleteMany({
  //   where: {
  //     postedById: payload.user.id,
  //   },
  // });

  // await prisma.message.deleteMany({
  //   where: {
  //     sentById: payload.user.id,
  //   },
  // });

  // await prisma.user.update({
  //   where: {
  //     id: payload.user.id,
  //   },
  //   data: {
  //     userStatusId: "initialized",
  //     phoneNumber: v4(),
  //   },
  // });

  // const message =
  //   "Admin command of resetting the user has been executed. You can now use your phone number again.";

  // sendWhatsAppMessageText(payload.phoneNumber, message);

  return json({ body: "OK", status: 200 });
};
