import createClient, {
  ImageAnalysisClient,
} from "@azure-rest/ai-vision-image-analysis";
import { AzureKeyCredential } from "@azure/core-auth";
require("dotenv").config();

const endpoint = process.env["VISION_ENDPOINT"];
const key = process.env["VISION_KEY"];

const credential = new AzureKeyCredential(key);
const client = createClient(endpoint, credential);

const features = ["Read"];

export async function analyzeImage(buffer: Buffer) {
  const result = await client.path("/imageanalysis:analyze").post({
    body: buffer,
    queryParameters: {
      features: features,
    },
    contentType: "application/octet-stream",
  });

  const iaResult = result.body;

  let odometerLines = [];

  if ("readResult" in iaResult) {
    iaResult.readResult.blocks.forEach((block) => {
      block.lines.forEach((line) => {
        if (Number(line.text) > 1000) {
          odometerLines.push(line);
        }
      });
    });
  }

  return odometerLines;
}
