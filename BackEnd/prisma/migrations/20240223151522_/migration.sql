/*
  Warnings:

  - You are about to drop the `practices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profiles_Doctor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "practices" DROP CONSTRAINT "practices_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "profiles_Doctor" DROP CONSTRAINT "profiles_Doctor_users_id_fkey";

-- DropTable
DROP TABLE "practices";

-- DropTable
DROP TABLE "profiles_Doctor";

-- CreateTable
CREATE TABLE "profiles_doctor" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "picture" TEXT,
    "spesialis" TEXT,
    "description" TEXT,
    "city" TEXT,
    "province" TEXT,
    "country" TEXT,
    "users_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Practice" (
    "id" SERIAL NOT NULL,
    "days" TEXT NOT NULL,
    "open" TEXT NOT NULL,
    "close" TEXT NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Practice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hospitals" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hospitals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_doctor_users_id_key" ON "profiles_doctor"("users_id");

-- AddForeignKey
ALTER TABLE "profiles_doctor" ADD CONSTRAINT "profiles_doctor_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Practice" ADD CONSTRAINT "Practice_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "profiles_doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hospitals" ADD CONSTRAINT "hospitals_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "profiles_doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
