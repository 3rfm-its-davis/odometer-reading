BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[LastQuatricsResponseRetrieval] (
    [id] NVARCHAR(1000) NOT NULL,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [LastQuatricsResponseRetrieval_pkey] PRIMARY KEY CLUSTERED ([id])
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
