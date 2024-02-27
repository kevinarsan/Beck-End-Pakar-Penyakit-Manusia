/*
  Warnings:

  - You are about to drop the column `practiceId` on the `profiles_Doctor` table. All the data in the column will be lost.
  - Added the required column `doctorId` to the `practices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "profiles_Doctor" DROP CONSTRAINT "profiles_Doctor_practiceId_fkey";

-- AlterTable
ALTER TABLE "practices" ADD COLUMN     "doctorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "profiles_Doctor" DROP COLUMN "practiceId";

-- AddForeignKey
ALTER TABLE "practices" ADD CONSTRAINT "practices_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "profiles_Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
