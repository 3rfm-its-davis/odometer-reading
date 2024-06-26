/*
  Warnings:

  - You are about to drop the column `surveyUserId` on the `Participation` table. All the data in the column will be lost.
  - You are about to drop the `SurveyUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Participation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Participation` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
DROP INDEX [Participation_surveyUserId_idx] ON [dbo].[Participation];

-- DropIndex
ALTER TABLE [dbo].[Participation] DROP CONSTRAINT [Participation_surveyUserId_key];

-- AlterTable
ALTER TABLE [dbo].[Participation] DROP COLUMN [surveyUserId];
ALTER TABLE [dbo].[Participation] ADD [userId] NVARCHAR(1000) NOT NULL;

-- DropTable
DROP TABLE [dbo].[SurveyUser];

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [name] NVARCHAR(1000),
    [phoneNumber] NVARCHAR(1000),
    [accessCode] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_phoneNumber_key] UNIQUE NONCLUSTERED ([phoneNumber]),
    CONSTRAINT [User_accessCode_key] UNIQUE NONCLUSTERED ([accessCode])
);

-- CreateIndex
ALTER TABLE [dbo].[Participation] ADD CONSTRAINT [Participation_userId_key] UNIQUE NONCLUSTERED ([userId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Participation_userId_idx] ON [dbo].[Participation]([userId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
