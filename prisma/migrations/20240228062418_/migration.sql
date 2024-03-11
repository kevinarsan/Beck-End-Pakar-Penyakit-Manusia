/*
  Warnings:

  - You are about to drop the column `overalRating` on the `ratings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ratings" DROP COLUMN "overalRating",
ADD COLUMN     "overal_rating" DOUBLE PRECISION;
