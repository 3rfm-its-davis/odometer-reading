import nodemailer from "nodemailer";
import { message } from "./messageConst";
import { prisma } from "./prisma.server";

export const sendEmail = async (users: any[], adminId?: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
    debug: true,
    logger: true,
  });

  if (
    users.filter((user) =>
      user.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
    ).length === 0
  ) {
    return users;
  }

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const newUsers = users.map(async (user, index) => {
    await delay(index * 1000);

    if (user.invitationCount > 0) {
      return user;
    }

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email!,
        subject:
          "Instructions for Participating in Odometer Picture Collection Study",
        html: message("instruction", user.accessCode),
      });

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          invitations: {
            create: {
              sentById: adminId,
            },
          },
        },
      });
      return {
        ...user,
        lastInvitationSentAt: new Date().toISOString(),
        invitationCount: user.invitationCount + 1,
      };
    } catch (error) {
      console.error(error);
      return user;
    }
  });

  return Promise.all(newUsers);
};
