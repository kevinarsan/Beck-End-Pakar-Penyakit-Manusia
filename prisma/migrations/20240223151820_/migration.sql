/*
  Warnings:

  - You are about to drop the column `doctorId` on the `hospitals` table. All the data in the column will be lost.
  - You are about to drop the column `doctorId` on the `practices` table. All the data in the column will be lost.
  - Added the required column `doctor_id` to the `hospitals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctor_id` to the `practices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "hospitals" DROP CONSTRAINT "hospitals_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "practices" DROP CONSTRAINT "practices_doctorId_fkey";

-- AlterTable
ALTER TABLE "hospitals" DROP COLUMN "doctorId",
ADD COLUMN     "doctor_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "practices" DROP COLUMN "doctorId",
ADD COLUMN     "doctor_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "practices" ADD CONSTRAINT "practices_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "profiles_doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hospitals" ADD CONSTRAINT "hospitals_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "profiles_doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
