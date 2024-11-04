-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "activatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "phoneNumber" TEXT NOT NULL,
    "accessCode" TEXT NOT NULL,
    "userStatusId" TEXT NOT NULL DEFAULT 'initialized',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStatus" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" BYTEA NOT NULL,
    "reading" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "postStatusId" TEXT NOT NULL,
    "statusChangedById" TEXT,
    "postedById" TEXT NOT NULL,
    "notes" TEXT,
    "rejectionReasonId" TEXT,
    "size" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RejectionReason" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RejectionReason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostStatus" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT NOT NULL,
    "sentById" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "totalIncentive" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Participation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IncentiveTable" (
    "id" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "incentive" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "IncentiveTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invitation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sentById" TEXT,
    "sentToId" TEXT NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LastQualtricsResponseRetrieval" (
    "id" TEXT NOT NULL,

    CONSTRAINT "LastQualtricsResponseRetrieval_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_accessCode_key" ON "User"("accessCode");

-- CreateIndex
CREATE INDEX "User_userStatusId_idx" ON "User"("userStatusId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE INDEX "Post_postStatusId_idx" ON "Post"("postStatusId");

-- CreateIndex
CREATE INDEX "Post_postedById_idx" ON "Post"("postedById");

-- CreateIndex
CREATE INDEX "Post_statusChangedById_idx" ON "Post"("statusChangedById");

-- CreateIndex
CREATE INDEX "Post_rejectionReasonId_idx" ON "Post"("rejectionReasonId");

-- CreateIndex
CREATE INDEX "Message_sentById_idx" ON "Message"("sentById");

-- CreateIndex
CREATE UNIQUE INDEX "Participation_userId_key" ON "Participation"("userId");

-- CreateIndex
CREATE INDEX "Participation_userId_idx" ON "Participation"("userId");

-- CreateIndex
CREATE INDEX "Invitation_sentById_idx" ON "Invitation"("sentById");

-- CreateIndex
CREATE INDEX "Invitation_sentToId_idx" ON "Invitation"("sentToId");
