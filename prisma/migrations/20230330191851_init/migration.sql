/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserApiKey` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[apiKey]` on the table `UserApiKey` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserApiKey_userId_key" ON "UserApiKey"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserApiKey_apiKey_key" ON "UserApiKey"("apiKey");
