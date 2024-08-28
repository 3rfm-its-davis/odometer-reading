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
  await prisma.user.deleteMany({});
  await prisma.user.createMany({
    data: accessCodeArray.map((item) => ({
      accessCode: item.accessCode,
      email: item.email,
    })),
  });

  await prisma.postStatus.deleteMany({});
  await prisma.postStatus.createMany({
    data: postStatusArray.map((item) => ({ id: item })),
  });

  await prisma.userStatus.deleteMany({});
  await prisma.userStatus.createMany({
    data: userStatusArray.map((item) => ({ id: item })),
  });
}

main()
  .then(async () => {
    prisma.user.findUnique({ where: { accessCode: "QWERTY" } }).then((user) => {
      const decipher = crypto.createDecipheriv(algorithm, secretKey!, iv!);
      const email =
        decipher.update(user!.email!, "hex", "utf8") + decipher.final("utf8");

      console.log(email);
      console.log(user);
    });
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
