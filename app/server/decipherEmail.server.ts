import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

export const decipherEmail = (email: string, decipherKey: string) => {
  const algorithm = "aes256";
  const secretKey = decipherKey;
  const iv = process.env.IV_EMAIL;

  try {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv!);
    const decryptedEmail =
      decipher.update(email, "hex", "utf8") + decipher.final("utf8");
    return decryptedEmail;
  } catch (error) {
    console.log("Error: ", error);
    return email;
  }
};
