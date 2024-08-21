import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import accessCodes from "./seedValues/accessCodes.json";

dotenv.config();

const accessCodeArray: string[] =
  process.env.NODE_ENV === "development" ? accessCodes : [];

const prisma = new PrismaClient();
const postStatusArray = [
  "submitted",
  "read",
  "approved",
  "rejected",
  "cancelled",
];
const userStatusArray = [
  "initialized",
  "activated",
  "suspended",
  "closed",
  "stopping",
  "deleted",
  "completed",
];

async function main() {
  await prisma.postStatus.deleteMany({});
  await prisma.postStatus.createMany({
    data: postStatusArray.map((item) => ({ id: item })),
  });

  await prisma.userStatus.deleteMany({});
  await prisma.userStatus.createMany({
    data: userStatusArray.map((item) => ({ id: item })),
  });

  await prisma.user.createMany({
    data: accessCodeArray.map((item) => ({
      accessCode: item,
    })),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
