/*
  Warnings:

  - You are about to drop the column `doctor_id` on the `practices` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "practices" DROP CONSTRAINT "practices_doctor_id_fkey";

-- AlterTable
ALTER TABLE "practices" DROP COLUMN "doctor_id";
