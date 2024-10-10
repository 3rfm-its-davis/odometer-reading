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
      where: {
        email: {
          not: { contains: "-" },
        },
      },
    })
  ).map((item) => item.email);

  const usersToBeUpdated = (
    await prisma.user.findMany({
      where: {
        email: {
          contains: "-",
        },
      },
      take: emailsRetrieved.length,
    })
  )
    .map((item, index) => {
      const cipher = crypto.createCipheriv(algorithm, secretKey!, iv!);
      return {
        ...item,
        email: emailsRetrieved[index],
        emailCiphered:
          cipher.update(emailsRetrieved[index], "utf8", "hex") +
          cipher.final("hex"),
      };
    })
    .filter((item) => !emailsCurrent.includes(item.emailCiphered));

  console.log("Users to be updated: ", usersToBeUpdated);

  Promise.all(
    usersToBeUpdated.map(async (user) => {
      return prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          email: user.emailCiphered,
        },
      });
    })
  );

  sendEmail(usersToBeUpdated);
};
