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
        <li><strong>Submit Multiple Images:</strong> Please submit at least three pictures over the course of three days. Please note—only one image per calendar day will be considered.</li>
        <li><strong>Deletions of Images:</strong> In case you wish to delete any sent image from our database, please send the command "DELETE {image name}" (e.g., "DELETE IMG-1").</li>
        <li><strong>Use HELP:</strong> If you need assistance, type "HELP" to see a list of available commands and instructions.</li>
        <li><strong>Stop Participation:</strong> Once you've completed your submissions, you can stop further participation by sending "STOP ${user.accessCode}".</li>
    </ol>
    <p>You may read the QR code below to directly navigate to the phone number.</p>
    <img src="data:image/png;base64,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e0zeUzF2vW12kW+3S5cu8hXELb2/93rPUSzH/tZbb91xxx3yx6elpZWUlPj2QTcZra2tH3744a5du/bs2XPixIkvvvji73//e2tra/sHwl/72tfS0tIGDhx40003/cu//Evv3r296veZZ5756U9/Kn/897///Z07d3b00yNHjgwfPry9bN9S8ZscvL+fKrJDb5sBTHgVbaroXQW9s+T5cA4fPmzRnd1vs5YuXSo/FiO0tLQ0NjYq7aKkpMTuGjqlpaUWDUquRCNfoa3aPOfFHDunok6Vs+VlnSr4915nwPqh76VLl9pqrX///q4r8pdQKNS1a1d17dfX12dnZ9vafzg7O9tiu4zjx4/b2igRiCXiEP5l/aezpaVFvqlQKPSDH/zAi6LiyP33319aWip/fCgUeumllywOePLJJ5ubm70oDfAecQj/am5utvj05v3335dvauTIkR5+nRYPXnrppdWrV9t6ycqVKy3u92lra/PPPpTAVxGH8K/09HSLL8xfeeUV+abGjx/vUVFx4dChQw888ICtl/Tv3//HP/6xxQFdunRpbGx0XRqgCnEI/5owYUJHP2pra8vPz5dv6rbbbvOoqOA7efLkxIkTbX1l2P4oi8VPtd+jAXSKOIR/WcRhWVmZfDvJyckjR470qKiAO3PmzKRJkyoqKmy9au7cuRZ30ATyMQMED3EIn0pISBg7dmxHP926datkO6FQ6JZbblF6B2Zg1NbWTp482dbtM0KIpKSkP/zhD8qKAmKEOIRPjRkzplu3bh39VH7jvdbW1ttvv927ugKrqakpOzvb7npsQoj9+/fbfTYR8CHiED5l8UlpfX39iRMn5Ju69dZbPSoqsM6fP5+VlfXee+/ZfeHMmTOtPyYFTBHWXQBweRZxaGsN6PalyzwqKpjOnDkzderUoqIiuy8cPHjw888/r6YoINaIQ/hRnz59rr322o5++tprr8k35edd1/3g888/v+222z7++GO7L0xISHjjjTd69Oihpi4g1ohD+JHFpWH7E+LyTRGHFj755JPx48fbvY+03fPPPz9s2DAFRQF68N0h/Mji5pfKykr5R+LC4bDF7alx7r333rvpppucZeH8+fPvvfdeBUUB2ti4OlTxIG3wtkNiwywZbs77r371K/mDMzMz3WyfG1RNTU2PPvrok08+6ezly5Yts7Xl0wV6/4bofcep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" width="240", height="240"/>
    <hr>
    <h3>Next Steps:</h3>
    <p>Our team will verify the odometer images. You'll receive a $5 gift card as a token of appreciation if you meet the criteria: 1) Send at least three images within three days after registration
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
