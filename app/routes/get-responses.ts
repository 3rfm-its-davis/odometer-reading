import { ActionFunctionArgs, json } from "@remix-run/node";
import axios from "axios";
import { prisma } from "prisma/schema/builder";
import { RegisterUser } from "~/server/registerUsers";

export async function action({ request }: ActionFunctionArgs) {
  await requireApiKey(request);

  const body = JSON.parse(await request.text());

  const { server, surveyId } = body;

  if (!surveyId) {
    return json({ message: "Invalid request body" }, { status: 400 });
  }

  const continuationToken = (
    await prisma.lastQualtricsResponseRetrieval.findFirst({})
  )?.id;

  const progressId = (
    await axios.post(
      `https://${server}.qualtrics.com/API/v3/surveys/${surveyId}/export-responses`,
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
    return json({ message: "Failed to export responses" }, { status: 500 });
  }

  let fileId = undefined;
  let newContinuationToken = continuationToken;

  const getFileIdInterval = setInterval(async () => {
    const response = await axios.get(
      `https://${server}.qualtrics.com/API/v3/surveys/${surveyId}/export-responses/${progressId}`,
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
      `https://${server}.qualtrics.com/API/v3/surveys/${surveyId}/export-responses/${fileId}/file`,
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
    return json({ message: "No emails found" }, { status: 200 });
  }

  RegisterUser(emailsRetrieved);

  return json({ message: "Emails updated" }, { status: 200 });
}

const requireApiKey = async (request: Request) => {
  const apiKey = request.headers.get("x-api-key");

  if (!apiKey || apiKey !== process.env.QUALTRICS_API_KEY) {
    return json({ message: "Invalid API key" }, { status: 401 });
  }
};

const getFileId = async (
  server: string,
  surveyId: string,
  progressId: string
) => {
  const fileId = (
    await axios.get(
      `https://${server}.qualtrics.com/API/v3/surveys/${surveyId}/export-responses/${progressId}`,
      {
        headers: {
          "X-API-TOKEN": process.env.QUALTRICS_API_KEY,
        },
      }
    )
  ).data?.result?.fileId;

  if (!fileId) {
    return getFileId(server, surveyId, progressId);
  } else {
    return fileId;
  }
};
