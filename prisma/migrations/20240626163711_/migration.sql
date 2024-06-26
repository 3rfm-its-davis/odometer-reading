/*
  Warnings:

  - You are about to drop the column `statusId` on the `Post` table. All the data in the column will be lost.
  - Added the required column `postStatusId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
DROP INDEX [Post_statusId_idx] ON [dbo].[Post];

-- AlterTable
ALTER TABLE [dbo].[Post] DROP COLUMN [statusId];
ALTER TABLE [dbo].[Post] ADD [postStatusId] NVARCHAR(1000) NOT NULL;

-- CreateIndex
CREATE NONCLUSTERED INDEX [Post_postStatusId_idx] ON [dbo].[Post]([postStatusId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
