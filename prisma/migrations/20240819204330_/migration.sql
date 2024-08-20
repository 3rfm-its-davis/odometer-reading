BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [activatedAt] DATETIME2,
    [deletedAt] DATETIME2,
    [phoneNumber] NVARCHAR(1000) NOT NULL CONSTRAINT [User_phoneNumber_df] DEFAULT '',
    [accessCode] NVARCHAR(1000) NOT NULL,
    [userStatusId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_phoneNumber_key] UNIQUE NONCLUSTERED ([phoneNumber]),
    CONSTRAINT [User_accessCode_key] UNIQUE NONCLUSTERED ([accessCode])
);

-- CreateTable
CREATE TABLE [dbo].[UserStatus] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [UserStatus_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [UserStatus_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Admin] (
    [id] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Admin_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Admin_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Post] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Post_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [image] VARBINARY(max) NOT NULL,
    [reading] FLOAT(53),
    [postStatusId] NVARCHAR(1000) NOT NULL,
    [postedById] NVARCHAR(1000) NOT NULL,
    [notes] NVARCHAR(1000),
    [size] FLOAT(53) NOT NULL CONSTRAINT [Post_size_df] DEFAULT 0,
    CONSTRAINT [Post_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PostStatus] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PostStatus_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
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
CREATE NONCLUSTERED INDEX [User_userStatusId_idx] ON [dbo].[User]([userStatusId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Post_postStatusId_idx] ON [dbo].[Post]([postStatusId]);

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
