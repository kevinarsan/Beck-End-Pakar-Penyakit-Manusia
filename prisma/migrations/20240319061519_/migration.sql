/*
  Warnings:

  - You are about to drop the column `verification_token` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "verification_token",
ADD COLUMN     "is_active" BOOLEAN,
ADD COLUMN     "validasi" TEXT;
