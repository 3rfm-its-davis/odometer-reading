import { CronJob } from "cron";
import { prisma } from "./prisma.server";

export const cronJob = async () => {
  console.log("Cronjob started");

  CronJob.from({
    cronTime: "0 0 4 * * *",
    onTick: async () => {
      const users = await prisma.user.findMany({
        where: {
          activatedAt: {
            lt: new Date(new Date().setDate(new Date().getDate() - 14)),
          },
          phoneNumber: {
            not: {
              contains: "TEST",
            },
          },
          userStatusId: "activated",
        },
      });

      prisma.user
        .updateMany({
          where: {
            id: {
              in: users.map((user) => user.id),
            },
          },
          data: {
            userStatusId: "closed",
            deletedAt: new Date(),
          },
        })
        .then(() => {
          console.log(`Cronjob complete: ${users.length} users closed`);
        });
    },
    start: true,
    timeZone: "America/Los_Angeles",
  });
};
