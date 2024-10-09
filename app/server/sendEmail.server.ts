import nodemailer from "nodemailer";
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
        "[3RFM Internal Test] Instructions for Participating in Odometer Picture Collection Study",
      html: `<p>Dear Participant,</p>
    <p>Thank you for agreeing to participate in our study, "Collecting Odometer Pictures via WhatsApp to Measure Precise VMT." We appreciate your time and contribution to this important research. Below are the detailed instructions for your participation:</p>
    <h3>How to Participate:</h3>
    <ol>
        <li><strong>Register:</strong> Send a message with the format "REGISTER ${user.accessCode}" to +1-833-275-4838 on WhatsApp. You will receive a confirmation of your registration.</li>
        <li><strong>Submit Images:</strong> Take pictures of your vehicle's odometer and send them via WhatsApp. You'll receive a confirmation message for each submission.</li>
        <li><strong>Submit Multiple Images:</strong> Please submit at least three pictures over the course of ten days. Please note—only one image per calendar day will be considered.</li>
        <li><strong>Deletions of Images:</strong> In case you wish to delete any sent image from our database, please send the command "DELETE {image name}" (e.g., "DELETE IMG-1").</li>
        <li><strong>Use HELP:</strong> If you need assistance, type "HELP" to see a list of available commands and instructions.</li>
        <li><strong>Stop Participation:</strong> Once you've completed your submissions, you can stop further participation by sending "STOP ${user.accessCode}".</li>
    </ol>
    <hr>
    <h3>Next Steps:</h3>
    <p>Our team will verify the odometer images. You'll receive a $5 gift card as a token of appreciation if you meet the criteria: 1) Send at least three images within seven days after registration
    , 2) Our team verifies the images.</p>
    <p>Please note that only the first 1,000 participants who successfully complete the tasks will be eligible for the gift card.</p>
    <p>If you encounter any issues or have questions, please don't hesitate to contact the research team at <a href="mailto:mobilitystudy@ucdavis.edu">mobilitystudy@ucdavis.edu</a> or me at <a href="mailto:sgulhare@ucdavis.edu">sgulhare@ucdavis.edu</a>.</p>
    <p>We greatly appreciate your time and look forward to your valuable contribution to this vital research.</p>
    <p>Best regards,<br>
    Siddhartha Gulhare<br>
    Postdoctoral Researcher<br>
    3 Revolutions Future Mobility<br>
    Institute of Transportation Studies, University of California Davis</p>
`,
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
          user.invitationCount > 1
            ? secondInvitation.subject
            : firstInvitation.subject,
        html:
          user.invitationCount > 1
            ? secondInvitation.html
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
