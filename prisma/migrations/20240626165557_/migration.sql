/*
  Warnings:

  - You are about to drop the column `userId` on the `Participation` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[surveyUserId]` on the table `Participation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `surveyUserId` to the `Participation` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
DROP INDEX [Participation_userId_idx] ON [dbo].[Participation];

-- DropIndex
ALTER TABLE [dbo].[Participation] DROP CONSTRAINT [Participation_userId_key];

-- AlterTable
ALTER TABLE [dbo].[Participation] DROP COLUMN [userId];
ALTER TABLE [dbo].[Participation] ADD [surveyUserId] NVARCHAR(1000) NOT NULL;

-- DropTable
DROP TABLE [dbo].[User];

-- CreateTable
CREATE TABLE [dbo].[SurveyUser] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [SurveyUser_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [name] NVARCHAR(1000),
    [phoneNumber] NVARCHAR(1000),
    [accessCode] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [SurveyUser_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [SurveyUser_phoneNumber_key] UNIQUE NONCLUSTERED ([phoneNumber]),
    CONSTRAINT [SurveyUser_accessCode_key] UNIQUE NONCLUSTERED ([accessCode])
);

-- CreateIndex
ALTER TABLE [dbo].[Participation] ADD CONSTRAINT [Participation_surveyUserId_key] UNIQUE NONCLUSTERED ([surveyUserId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Participation_surveyUserId_idx] ON [dbo].[Participation]([surveyUserId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
