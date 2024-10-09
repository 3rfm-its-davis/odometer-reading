import { ActionFunctionArgs, json } from "@remix-run/node";
import axios from "axios";
import { RegisterUser } from "~/server/registerUsers";

export async function action({ request }: ActionFunctionArgs) {
  await requireApiKey(request);

  const body = JSON.parse(await request.text());

  const { server, surveyId } = body;

  if (!surveyId) {
    return json({ message: "Invalid request body" }, { status: 400 });
  }

  const progressId = (
    await axios.post(
      `https://${server}.qualtrics.com/API/v3/surveys/${surveyId}/export-responses`,
      {
        format: "json",
        limit: 5,
        sortByLastModifiedDate: true,
        compress: false,
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

  const intervalId = setInterval(async () => {
    const response = await axios.get(
      `https://${server}.qualtrics.com/API/v3/surveys/${surveyId}/export-responses/${progressId}`,
      {
        headers: {
          "X-API-TOKEN": process.env.QUALTRICS_API_KEY,
        },
      }
    );

    fileId = response.data?.result?.fileId;

    if (fileId) {
      clearInterval(intervalId);
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

  console.log("Blob: ", file);

  const emailsRetrieved: string[] = file.responses.map(
    (item: { values: { QID9_1: any } }) => item.values.QID9_1
  );

  console.log("Emails: ", emailsRetrieved);

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
