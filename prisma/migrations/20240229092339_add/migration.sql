/*
  Warnings:

  - You are about to drop the column `city` on the `hospitals` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `hospitals` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `hospitals` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `hospitals` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `profiles_doctor` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `profiles_doctor` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `profiles_doctor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[address_id]` on the table `hospitals` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address_id]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address_id]` on the table `profiles_doctor` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "hospitals" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "location",
DROP COLUMN "province",
ADD COLUMN     "address_id" INTEGER;

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "province",
ADD COLUMN     "address_id" INTEGER;

-- AlterTable
ALTER TABLE "profiles_doctor" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "province",
ADD COLUMN     "address_id" INTEGER;

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "city" TEXT,
    "province" TEXT,
    "country" TEXT,
    "details" TEXT,
    "location" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hospitals_address_id_key" ON "hospitals"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_address_id_key" ON "profiles"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_doctor_address_id_key" ON "profiles_doctor"("address_id");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles_doctor" ADD CONSTRAINT "profiles_doctor_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hospitals" ADD CONSTRAINT "hospitals_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;
