/*
  Warnings:

  - You are about to drop the column `oraganization` on the `biodata` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "biodata" DROP COLUMN "oraganization",
ADD COLUMN     "organization" TEXT;
