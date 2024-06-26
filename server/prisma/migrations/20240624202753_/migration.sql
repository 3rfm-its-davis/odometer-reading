BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [name] NVARCHAR(1000),
    [accessCode] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_accessCode_key] UNIQUE NONCLUSTERED ([accessCode])
);

-- CreateTable
CREATE TABLE [dbo].[Post] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Post_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [image] NVARCHAR(1000) NOT NULL,
    [reading] NVARCHAR(1000) NOT NULL,
    [statusId] NVARCHAR(1000) NOT NULL,
    [postedById] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Post_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PostStatus] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PostStatus_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [type] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [PostStatus_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Participation] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Participation_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [totalIncentive] FLOAT(53) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Participation_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Participation_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[IncentiveTable] (
    [id] NVARCHAR(1000) NOT NULL,
    [index] INT NOT NULL,
    [incentive] FLOAT(53) NOT NULL,
    CONSTRAINT [IncentiveTable_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Post_statusId_idx] ON [dbo].[Post]([statusId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Post_postedById_idx] ON [dbo].[Post]([postedById]);

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
