/*
  Warnings:

  - You are about to drop the column `rating` on the `ratings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ratings" DROP COLUMN "rating",
ADD COLUMN     "overalRating" INTEGER;
