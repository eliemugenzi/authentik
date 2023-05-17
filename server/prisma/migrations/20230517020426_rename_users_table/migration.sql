/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birth_date" TEXT NOT NULL,
    "gender" "UserGender" NOT NULL,
    "nationality" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "national_id" TEXT NOT NULL,
    "marital_status" "UserMaritalStatus" NOT NULL,
    "status" "UserStatus" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
