import axios from "axios";
import { CronJob } from "cron";
import dotenv from "dotenv";
import { prisma } from "./prisma.server";
import { RegisterUser } from "./registerUsers";

dotenv.config();

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

  CronJob.from({
    cronTime: "0 */10 * * * *",
    onTick: async () => {
      const continuationToken = (
        await prisma.lastQualtricsResponseRetrieval.findFirst({})
      )?.id;

      const progressId = (
        await axios.post(
          `https://${process.env.QUALTRICS_SERVER}.qualtrics.com/API/v3/surveys/${process.env.QUALTRICS_SURVEY}/export-responses`,
          {
            format: "json",
            limit: 5,
            compress: false,
            allowContinuation: continuationToken !== "default" ? false : true,
            continuationToken:
              continuationToken !== "default" ? continuationToken : undefined,
          },
          {
            headers: {
              "X-API-TOKEN": process.env.QUALTRICS_API_KEY,
            },
          }
        )
      ).data?.result?.progressId;

      if (!progressId) {
        return;
      }

      let fileId = undefined;
      let newContinuationToken = continuationToken;

      const getFileIdInterval = setInterval(async () => {
        const response = await axios.get(
          `https://${process.env.QUALTRICS_SERVER}.qualtrics.com/API/v3/surveys/${process.env.QUALTRICS_SURVEY}/export-responses/${progressId}`,
          {
            headers: {
              "X-API-TOKEN": process.env.QUALTRICS_API_KEY,
            },
          }
        );

        fileId = response.data?.result?.fileId;
        newContinuationToken = response.data?.result?.continuationToken;

        if (fileId) {
          clearInterval(getFileIdInterval);
        }
      }, 2500);

      while (!fileId) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      const file = (
        await axios.get(
          `https://${process.env.QUALTRICS_SERVER}.qualtrics.com/API/v3/surveys/${process.env.QUALTRICS_SURVEY}/export-responses/${fileId}/file`,
          {
            headers: {
              "X-API-TOKEN": process.env.QUALTRICS_API_KEY,
            },
          }
        )
      ).data;

      if (file.responses.length > 0) {
        await prisma.lastQualtricsResponseRetrieval.update({
          where: {
            id: continuationToken,
          },
          data: {
            id: newContinuationToken,
          },
        });
      }

      const emailsRetrieved: string[] = file.responses
        .map((item: { values: { QID9_1: any } }) => item.values.QID9_1)
        .filter((item: string) => item !== undefined)
        .filter(
          (item: string, index: number, array: string[]) =>
            array.indexOf(item) === index
        );

      if (emailsRetrieved.length === 0) {
        return;
      }

      RegisterUser(emailsRetrieved);

      return;
    },
    start: true,
    timeZone: "America/Los_Angeles",
  });
};
