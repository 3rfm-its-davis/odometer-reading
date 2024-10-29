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

const addTestImages = async () => {
  const testUsersCreated = await prisma.user.findMany({
    where: {
      phoneNumber: {
        contains: "TEST",
      },
    },
  });

  // pick 100 inactive users from prisma db
  const users = await prisma.user.findMany({
    where: {
      email: {
        contains: "-",
      },
    },
    take: 100 - testUsersCreated.length,
  });

  for (const [index, user] of [...testUsersCreated, ...users].entries()) {
    await new Promise((resolve) => setTimeout(resolve, index * 3000));

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

    // get a random number from -1 to 10
    const random = Math.floor(Math.random() * 11) - 1;
    // pick 10 numbers randomly from 0 to 58
    const numbers: number[] = [];
    while (numbers.length < random) {
      const number = Math.floor(Math.random() * 58);
      if (!numbers.includes(number)) {
        numbers.push(number);
      }
    }

    // pick a time between October 1, 2024 and October 8, 2024
    const daysToAddToSurveyCompletionStandardDate = Math.random() * 7;
    const surveyCompletionStandardDate = new Date(2024, 9, 1);
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

    const prismaImages: Omit<Prisma.PostCreateManyInput, "postedById">[] =
      images.map((image, imageIndex) => {
        let daysToAddToActivationDate;
        const randNormal = r.normal(0, 5);
        const randNormalValue = randNormal();
        if (randNormalValue < 0) {
          daysToAddToActivationDate = Math.abs(randNormalValue);
        } else if (randNormalValue > 14) {
          daysToAddToActivationDate = 14;
        } else {
          daysToAddToActivationDate = randNormalValue;
        }

        return {
          id: `TEST-${user.accessCode}-IMG-${imageIndex + 1}`,
          image: image,
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

    const email = `test${phoneNumber}@hogehoge.fugafuga`;
    const cipher = crypto.createCipheriv(algorithm, secretKey!, iv!);

    const result = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        // TEST1 + random 10 numbers
        phoneNumber: `TEST1${phoneNumber}`,
        activatedAt: activationDate,
        userStatusId: random === -1 ? "initialized" : "activated",
        email: cipher.update(email, "utf8", "hex") + cipher.final("hex"),
        posts: {
          createMany: {
            data: prismaImages,
          },
        },
      },
    });

    console.log(result);
  }
};

addTestImages();
