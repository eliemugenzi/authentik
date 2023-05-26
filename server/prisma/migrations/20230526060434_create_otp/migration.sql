-- CreateEnum
CREATE TYPE "CodeStatus" AS ENUM ('ACTIVE', 'EXPIRED');

-- CreateTable
CREATE TABLE "OTPCode" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "status" "CodeStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OTPCode_pkey" PRIMARY KEY ("id")
);
