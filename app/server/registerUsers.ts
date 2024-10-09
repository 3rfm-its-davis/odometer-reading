import { prisma } from "./prisma.server";
import dotenv from "dotenv";
import { sendEmail } from "./sendEmail.server";
import crypto from "crypto";

dotenv.config();

const algorithm = "aes256";
const secretKey = process.env.SECRET_EMAIL;
const iv = process.env.IV_EMAIL;

export const RegisterUser = async (emailsRetrieved: string[]) => {
  const emailsCurrent = (
    await prisma.user.findMany({
      select: {
        email: true,
      },
      where: {
        email: {
          in: emailsRetrieved,
        },
      },
    })
  ).map((item) => item.email);

  console.log("Emails current: ", emailsCurrent);

  const emailsNew = emailsRetrieved
    .filter((item) => !emailsCurrent.includes(item))
    .filter((value, index, array) => array.indexOf(value) === index);

  const usersToBeUpdated = (
    await prisma.user.findMany({
      where: {
        email: {
          not: {
            contains: "-",
          },
        },
      },
      select: {
        id: true,
      },
      take: emailsNew.length,
    })
  ).map((item, index) => ({
    id: item.id,
    email: emailsNew[index],
  }));

  console.log("Users to be updated: ", usersToBeUpdated);

  const usersUpdated = await Promise.all(
    usersToBeUpdated.map(async (user) => {
      const cipher = crypto.createCipheriv(algorithm, secretKey!, iv!);
      return prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          email: cipher.update(user.email, "utf8", "hex") + cipher.final("hex"),
        },
      });
    })
  );

  sendEmail(
    usersUpdated.map((item, index) => ({
      ...item,
      email: emailsNew[index],
    }))
  );
};
