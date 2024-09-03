import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import accessCodes from "./seedValues/accessCodes.json";
import crypto from "crypto";

dotenv.config();

const algorithm = "aes256";
const secretKey = process.env.SECRET_EMAIL;
const iv = process.env.IV_EMAIL;

const accessCodeArray: {
  accessCode: string;
  email?: string;
}[] =
  process.env.NODE_ENV === "development"
    ? accessCodes.map((item) => {
        const cipher = crypto.createCipheriv(algorithm, secretKey!, iv!);

        return {
          accessCode: item.accessCode,
          email: item.email
            ? cipher.update(item.email, "utf8", "hex") + cipher.final("hex")
            : undefined,
        };
      })
    : [];

const prisma = new PrismaClient();
const postStatusArray = [
  "submitted",
  "read",
  "approved",
  "rejected",
  "deleted",
];
const userStatusArray = [
  "initialized",
  "activated",
  "suspended",
  "closed",
  "deleted",
  "completed",
];

async function main() {
  // await prisma.invitation.deleteMany({});
  // await prisma.post.deleteMany({});
  // await prisma.postStatus.deleteMany({});
  // await prisma.user.deleteMany({});
  // await prisma.userStatus.deleteMany({});

  // await prisma.user.createMany({
  //   data: accessCodeArray.map((item) => ({
  //     accessCode: item.accessCode,
  //     email: item.email,
  //   })),
  // });

  await Promise.all(
    accessCodeArray.map(async (item) => {
      console.log(item);
      await prisma.user.upsert({
        where: {
          accessCode: item.accessCode,
        },
        create: {
          accessCode: item.accessCode,
          email: item.email,
        },
        update: {},
      });
    })
  );
  // await prisma.postStatus.createMany({
  //   data: postStatusArray.map((item) => ({ id: item })),
  // });
  // await prisma.userStatus.createMany({
  //   data: userStatusArray.map((item) => ({ id: item })),
  // });
}

main().then(() => {
  console.log("Seed complete");
  process.exit(0);
});
