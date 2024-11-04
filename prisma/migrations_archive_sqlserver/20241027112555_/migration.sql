BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Post] ADD [rejectionReasonId] NVARCHAR(1000);

-- CreateTable
CREATE TABLE [dbo].[RejectionReason] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [RejectionReason_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [RejectionReason_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Post_rejectionReasonId_idx] ON [dbo].[Post]([rejectionReasonId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
