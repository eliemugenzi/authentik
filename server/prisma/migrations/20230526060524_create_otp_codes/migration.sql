/*
  Warnings:

  - You are about to drop the `OTPCode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "OTPCode";

-- CreateTable
CREATE TABLE "otp_codes" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "status" "CodeStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "otp_codes_pkey" PRIMARY KEY ("id")
);
