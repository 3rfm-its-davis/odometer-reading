/*
  Warnings:

  - You are about to alter the column `name` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
BEGIN TRY

BEGIN TRAN;

-- RedefineTables
BEGIN TRANSACTION;
DROP INDEX [Post_postedById_idx] ON [dbo].[Post];
DROP INDEX [Post_postStatusId_idx] ON [dbo].[Post];
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'Post'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_Post] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] INT NOT NULL IDENTITY(1,1),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Post_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [image] VARBINARY(max) NOT NULL,
    [reading] FLOAT(53),
    [postStatusId] NVARCHAR(1000) NOT NULL,
    [postedById] NVARCHAR(1000) NOT NULL,
    [notes] NVARCHAR(1000),
    [size] FLOAT(53) NOT NULL CONSTRAINT [Post_size_df] DEFAULT 0,
    CONSTRAINT [Post_pkey] PRIMARY KEY CLUSTERED ([id])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_Post] ON;
IF EXISTS(SELECT * FROM [dbo].[Post])
    EXEC('INSERT INTO [dbo].[_prisma_new_Post] ([createdAt],[id],[image],[name],[notes],[postStatusId],[postedById],[reading],[size]) SELECT [createdAt],[id],[image],[name],[notes],[postStatusId],[postedById],[reading],[size] FROM [dbo].[Post] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_Post] OFF;
DROP TABLE [dbo].[Post];
EXEC SP_RENAME N'dbo._prisma_new_Post', N'Post';
CREATE NONCLUSTERED INDEX [Post_postStatusId_idx] ON [dbo].[Post]([postStatusId]);
CREATE NONCLUSTERED INDEX [Post_postedById_idx] ON [dbo].[Post]([postedById]);
COMMIT;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
