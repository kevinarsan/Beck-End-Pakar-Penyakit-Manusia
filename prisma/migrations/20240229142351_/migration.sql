/*
  Warnings:

  - You are about to drop the column `address_id` on the `hospitals` table. All the data in the column will be lost.
  - You are about to drop the column `address_id` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `address_id` on the `profiles_doctor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "hospitals" DROP CONSTRAINT "hospitals_address_id_fkey";

-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_address_id_fkey";

-- DropForeignKey
ALTER TABLE "profiles_doctor" DROP CONSTRAINT "profiles_doctor_address_id_fkey";

-- DropIndex
DROP INDEX "profiles_address_id_key";

-- DropIndex
DROP INDEX "profiles_doctor_address_id_key";

-- AlterTable
ALTER TABLE "hospitals" DROP COLUMN "address_id";

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "address_id",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "province" TEXT;

-- AlterTable
ALTER TABLE "profiles_doctor" DROP COLUMN "address_id",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "province" TEXT;
