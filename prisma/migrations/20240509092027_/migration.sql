/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `diseases` table. All the data in the column will be lost.
  - Added the required column `update_at` to the `diseases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "diseases" DROP COLUMN "updatedAt",
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL;
