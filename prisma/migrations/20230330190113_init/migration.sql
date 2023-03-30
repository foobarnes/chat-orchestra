-- CreateTable
CREATE TABLE "UserApiKey" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "userId" STRING NOT NULL,
    "apiKey" STRING NOT NULL,

    CONSTRAINT "UserApiKey_pkey" PRIMARY KEY ("id")
);
