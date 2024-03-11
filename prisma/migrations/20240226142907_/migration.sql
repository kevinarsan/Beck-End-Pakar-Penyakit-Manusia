/*
  Warnings:

  - You are about to drop the column `doctor_id` on the `hospitals` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "hospitals" DROP CONSTRAINT "hospitals_doctor_id_fkey";

-- AlterTable
ALTER TABLE "hospitals" DROP COLUMN "doctor_id";
