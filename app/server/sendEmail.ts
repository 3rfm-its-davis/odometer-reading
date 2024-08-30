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
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email!,
        subject:
          "Invitation to Participate in the First Trial: Collecting Odometer Pictures via WhatsApp",
        html: `Dear 3RFM Members,<br><br>
We are excited to invite you to participate in the first trial of our study titled <b>"Collecting Odometer Pictures via WhatsApp to Measure Precise VMT."</b><br>
As part of our ongoing research efforts, Keita has developed a state-of-the-art automated framework that utilizes the WhatsApp API to efficiently collect odometer readings. Before we roll this out to a broader audience, we would greatly appreciate your help in testing this data collection framework within our research group.<br>
<br>
<b>What We Need from You:</b><br>

<ul>
  <li><b>Participation:</b> Please participate by submitting three pictures of odometers through WhatsApp by 5 PM of today. You can use odometer images from Google for testing purposes. Additionally, please intentionally send a few incorrect pictures and then request their deletion to help us test the system’s functionality. At the end of the survey, you will receive a dummy gift card of $5 (unfortunately, we are not allowed to pay ourselves—very unfortunate!).</li>
  <li><b>Feedback:</b> Your insights and feedback are invaluable. After using the system, we would greatly appreciate your thoughts on the process, ease of use, and any issues you might encounter. We will set up group meetings next week to gather feedback and discuss ways to improve the participation experience.</li>
</ul>

<b>How to Participate:</b>

<ol>
  <li>Using WhatsApp, please send a message with the format "REGISTER ${user.accessCode}" to +1-833-275-4838 for registration. You will receive an automated message confirming your registration.</li>
  <li>Send pictures of odometers (you can attach images of odometers taken from Google or other websites for ease). You will receive a receipt message confirming the submission (e.g., "IMG-0001").</li>
  <li>Please send multiple images for rigorous testing.</li>
  <li>To simulate scenarios where a participant accidentally sends personal images and would like to delete them, please delete one or two images using the command "DELETE {image name}" (e.g., "DELETE IMG-0001").</li>
  <li>You can use the command "HELP" at any time to see the menu of instructions or keywords.</li>
  <li>Once you have submitted the images, please send a message to stop further participation by typing "STOP ${user.accessCode}".</li>
  <li>Additionally, please feel free to create trouble in creative ways—send GIFs, emojis, attach videos, and send random messages and hyperlinks to test the rigor of our framework.</li>
</ol>

This pilot is crucial to ensuring our system works smoothly before we expand it to a larger audience. Your participation will help us refine the process and address any potential issues.<br>
If you have any questions or require assistance during the process, please feel free to reach out to Siddhartha or Keita.<br>
We truly value your time and input, and we look forward to your participation in this important study.<br>
<br>
Best regards,<br>
Siddhartha Gulhare<br>
Postdoctoral Researcher<br>
3 Revolutions Future Mobility<br>
Institute of Transportation Studies, UC Davis<br>
`,
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
