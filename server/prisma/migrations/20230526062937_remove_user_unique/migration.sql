/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `otp_codes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "otp_codes_user_id_key" ON "otp_codes"("user_id");
