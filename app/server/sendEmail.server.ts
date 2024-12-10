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
    const firstInvitation = {
      subject:
        "Instructions for Participating in Odometer Picture Collection Study",
      html: message("instruction", user.accessCode),
    };

    const secondInvitation = {
      subject:
        "Reminder: Participate in Our Odometer Picture Collection Trial Today!",
      html: `Dear 3RFM Members,<br>
<br>
Please submit three odometer pictures via WhatsApp by 5 PM today and provide feedback on the process.<br>
Your participation is crucial for testing our new data collection framework. For any questions, contact Siddhartha or Keita.
<br>
Best regards,<br>
Siddhartha Gulhare<br>
Postdoctoral Researcher<br>
3 Revolutions Future Mobility<br>
Institute of Transportation Studies, UC Davis<br>`,
    };

    await delay(index * 1000);

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email!,
        subject:
          user.invitationCount > 0
            ? firstInvitation.subject
            : firstInvitation.subject,
        html:
          user.invitationCount > 0
            ? firstInvitation.html
            : firstInvitation.html,
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
