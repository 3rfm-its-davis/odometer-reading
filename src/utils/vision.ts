import createClient, {
  ImageAnalysisClient,
} from "@azure-rest/ai-vision-image-analysis";
import { AzureKeyCredential } from "@azure/core-auth";
require("dotenv").config();

const endpoint = process.env["VISION_ENDPOINT"];
const key = process.env["VISION_KEY"];
console.log(endpoint);
console.log(key);

const credential = new AzureKeyCredential(key);
const client = createClient(endpoint, credential);

const features = ["Caption", "Read"];

export async function analyzeImage(buffer: Buffer) {
  const result = await client.path("/imageanalysis:analyze").post({
    body: buffer,
    queryParameters: {
      features: features,
    },
    contentType: "application/octet-stream",
  });

  const iaResult = result.body;

  console.log("Analysis Result:");
  console.log(iaResult);

  if ("captionResult" in iaResult) {
    console.log(
      `Caption: ${iaResult.captionResult.text} (confidence: ${iaResult.captionResult.confidence})`
    );
  }

  let odometerLines = [];

  if ("readResult" in iaResult) {
    iaResult.readResult.blocks.forEach((block) => {
      block.lines.forEach((line) => {
        if (Number(line.text) > 1000) {
          console.log(`Odometer: ${line.text}`);
          odometerLines.push(line);
        }
      });
    });
  }

  return odometerLines;
}
