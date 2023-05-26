/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `otp_codes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `otp_codes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "otp_codes" ADD COLUMN     "user_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "otp_codes_user_id_key" ON "otp_codes"("user_id");

-- AddForeignKey
ALTER TABLE "otp_codes" ADD CONSTRAINT "otp_codes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
