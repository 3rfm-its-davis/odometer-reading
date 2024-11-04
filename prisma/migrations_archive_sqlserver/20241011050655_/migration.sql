/*
  Warnings:

  - You are about to drop the `LastQuatricsResponseRetrieval` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropTable
DROP TABLE [dbo].[LastQuatricsResponseRetrieval];

-- CreateTable
CREATE TABLE [dbo].[LastQualtricsResponseRetrieval] (
    [id] NVARCHAR(1000) NOT NULL,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [LastQualtricsResponseRetrieval_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
