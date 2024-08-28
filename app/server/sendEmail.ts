import nodemailer from "nodemailer";
import { prisma } from "./prisma.server";

export const sendEmail = async (users: any[], adminId: string) => {
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

  const newUsers = users.map(async (user) => {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email!,
      subject: "Invitation",
      text: "You are invited to join the platform",
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
  });

  return Promise.all(newUsers);
};
