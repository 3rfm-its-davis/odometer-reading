/*
  Warnings:

  - You are about to drop the column `type` on the `PostStatus` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[PostStatus] DROP CONSTRAINT [PostStatus_type_key];

-- AlterTable
ALTER TABLE [dbo].[PostStatus] DROP COLUMN [type];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
