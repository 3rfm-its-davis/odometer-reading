/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `LastQualtricsResponseRetrieval` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[LastQualtricsResponseRetrieval] DROP COLUMN [updatedAt];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
