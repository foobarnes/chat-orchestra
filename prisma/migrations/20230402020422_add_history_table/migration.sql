-- CreateTable
CREATE TABLE "Subscription" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "stripeId" STRING NOT NULL,
    "status" STRING NOT NULL,
    "planId" STRING NOT NULL,
    "quantity" INT4 NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "trialStartDate" TIMESTAMP(3),
    "trialEndDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" STRING NOT NULL,
    "email" STRING NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenerateHistory" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "promptTemplate" STRING NOT NULL,
    "numVariables" INT4 NOT NULL,
    "numValues" INT4 NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GenerateHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_stripeId_key" ON "Subscription"("stripeId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");
