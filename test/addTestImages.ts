import { BlobServiceClient } from "@azure/storage-blob";
import { Prisma } from "@prisma/client";
import crypto from "crypto";
import dotenv from "dotenv";
import fs from "fs/promises";
import r from "random";
import { v4 } from "uuid";
import { prisma } from "~/server/prisma.server";

dotenv.config();

const algorithm = "aes256";
const secretKey = process.env.SECRET_EMAIL;
const iv = process.env.IV_EMAIL;

const addTestImages = async ({
  numUsers,
  userIndex,
  numImageMax,
  sdImage,
  reset,
  date,
}: {
  numUsers?: number;
  userIndex: number;
  numImageMax?: number;
  sdImage?: number;
  reset?: boolean;
  date?: Date;
}) => {
  if (reset) {
    const users = await prisma.user.findMany({
      where: {
        phoneNumber: {
          contains: `TEST${userIndex}`,
        },
      },
    });
    for (const [index, user] of users.entries()) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(`Processing user ${index + 1} of ${users.length}`);

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          email: v4(),
          phoneNumber: v4(),
          userStatusId: "initialized",
          activatedAt: null,
          deletedAt: null,
          posts: {
            deleteMany: {},
          },
        },
      });
    }
  } else if (numUsers && numImageMax && sdImage && date) {
    const users = await prisma.user.findMany({
      where: {
        email: {
          contains: "-",
        },
      },
      take: numUsers,
    });

    for (const [index, user] of users.entries()) {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      console.log(`Processing user ${index + 1} of ${users.length}`);

      const random = Math.floor(Math.random() * numImageMax + 1) - 1;
      const numbers: number[] = [];
      while (numbers.length < random) {
        const number = Math.floor(Math.random() * 58);
        if (!numbers.includes(number)) {
          numbers.push(number);
        }
      }

      // pick a time between October 1, 2024 and October 8, 2024
      const daysToAddToSurveyCompletionStandardDate = Math.random() * 7;
      const surveyCompletionStandardDate = date;
      const surveyCompletionDate = new Date(
        surveyCompletionStandardDate.getTime() +
          daysToAddToSurveyCompletionStandardDate * 24 * 60 * 60 * 1000
      );

      const daysToAddToSurveyCompletionDate = Math.random() * 3;
      const activationDate = new Date(
        surveyCompletionDate.getTime() +
          daysToAddToSurveyCompletionDate * 24 * 60 * 60 * 1000
      );

      // read a local jpeg image file with the file name as the number
      const images = await Promise.all(
        numbers.map(async (number) => {
          const image = await fs.readFile(`./test/images/${number}.jpg`);
          return image;
        })
      );

      const prismaImages: Promise<
        Omit<Prisma.PostCreateManyInput, "postedById">
      >[] = images.map(async (image, imageIndex) => {
        const imageId = `TEST-${user.accessCode}-IMG-${imageIndex + 1}`;
        const blobServiceClient = BlobServiceClient.fromConnectionString(
          process.env.AZURE_STORAGE_CONNECTION_STRING!
        );
        let blobUrl = "";

        try {
          const containerClient = blobServiceClient.getContainerClient(
            process.env.AZURE_STORAGE_CONTAINER_NAME!
          );

          const blobName = `${imageId}.jpg`;
          const blockBlobClient = containerClient.getBlockBlobClient(blobName);
          await blockBlobClient.upload(image, image.length);
          blobUrl = `https://${process.env
            .AZURE_STORAGE_ACCOUNT_NAME!}.blob.core.windows.net/${process.env
            .AZURE_STORAGE_CONTAINER_NAME!}/${blobName}`;
        } catch (e) {
          console.error(e);
        }

        let daysToAddToActivationDate;
        const randNormal = r.normal(0, sdImage);
        const randNormalValue = randNormal();
        if (randNormalValue < 0) {
          daysToAddToActivationDate = Math.abs(randNormalValue);
        } else if (randNormalValue > 14) {
          daysToAddToActivationDate = 14;
        } else {
          daysToAddToActivationDate = randNormalValue;
        }

        return {
          id: imageId,
          image: blobUrl,
          createdAt: new Date(
            activationDate.getTime() +
              daysToAddToActivationDate * 24 * 60 * 60 * 1000
          ),
          postStatusId: "submitted",
          size: image.length,
        };
      });

      console.log(prismaImages);

      const phoneNumber = Math.floor(Math.random() * 10000000000)
        .toString()
        .padStart(10, "0");

      const email = `test${userIndex}${phoneNumber}@hogehoge.fugafuga`;
      const cipher = crypto.createCipheriv(algorithm, secretKey!, iv!);

      const result = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          // TEST1 + random 10 numbers
          phoneNumber: `TEST${userIndex}${phoneNumber}`,
          activatedAt: activationDate,
          userStatusId: random === -1 ? "initialized" : "activated",
          email: cipher.update(email, "utf8", "hex") + cipher.final("hex"),
          posts: {
            createMany: {
              data: await Promise.all(prismaImages),
            },
          },
        },
      });

      console.log(result);
    }
  }
};

// await addTestImages({
//   userIndex: 1,
//   numUsers: 40,
//   numImageMax: 10,
//   sdImage: 3,
//   date: new Date("2024-10-01"),
// })
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//     process.exit(0);
//   });

await addTestImages({
  userIndex: 2,
  numUsers: 50,
  numImageMax: 10,
  sdImage: 3,
  date: new Date("2024-10-01"),
})
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

await addTestImages({
  userIndex: 3,
  numUsers: 60,
  numImageMax: 10,
  sdImage: 3,
  date: new Date("2024-10-01"),
})
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// addTestImages({
//   userIndex: 1,
//   reset: true,
// })
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//     process.exit(0);
//   });
