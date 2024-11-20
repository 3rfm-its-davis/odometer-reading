import { BlobServiceClient } from "@azure/storage-blob";

export const postImageToBlobContainer = async (
  imageId: string,
  image: Buffer
) => {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING!
  );
  try {
    const containerClient = blobServiceClient.getContainerClient(
      process.env.AZURE_STORAGE_CONTAINER_NAME!
    );

    const blockBlobClient = containerClient.getBlockBlobClient(
      `${imageId}.jpg`
    );
    await blockBlobClient.upload(image, image.length);
  } catch (error) {
    console.error(error);
  }
  return `https://${process.env
    .AZURE_STORAGE_ACCOUNT_NAME!}.blob.core.windows.net/${process.env
    .AZURE_STORAGE_CONTAINER_NAME!}/${imageId}.jpg`;
};

export const deleteImageFromBlobContainer = async (imageId: string) => {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING!
  );
  try {
    const containerClient = blobServiceClient.getContainerClient(
      process.env.AZURE_STORAGE_CONTAINER_NAME!
    );

    const blockBlobClient = containerClient.getBlockBlobClient(
      `${imageId}.jpg`
    );
    await blockBlobClient.delete();
  } catch (error) {
    console.error(error);
  }
};
