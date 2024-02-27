/*
  Warnings:

  - Made the column `doctor_id` on table `practices` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "practices" ALTER COLUMN "doctor_id" SET NOT NULL;
