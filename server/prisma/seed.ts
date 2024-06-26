import { PrismaClient } from "@prisma/client";
import accessCodes from "./seedValues/accessCodes.json";

const prisma = new PrismaClient();
const statusArray = [
  "submitted",
  "confirmedBySender",
  "confirmedByDev",
  "completed",
  "cancelled",
];

async function main() {
  await prisma.postStatus.deleteMany({});
  statusArray.forEach(async (status) => {
    const result = await prisma.postStatus.create({
      data: {
        type: status,
      },
    });
    console.log(result);
  });

  accessCodes.forEach(async (accessCode) => {
    const result = await prisma.user.upsert({
      where: {
        accessCode: accessCode,
      },
      update: {},
      create: {
        accessCode: accessCode,
      },
    });
    console.log(result);
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
