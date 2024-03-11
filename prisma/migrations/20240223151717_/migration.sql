/*
  Warnings:

  - You are about to drop the `Practice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Practice" DROP CONSTRAINT "Practice_doctorId_fkey";

-- DropTable
DROP TABLE "Practice";

-- CreateTable
CREATE TABLE "practices" (
    "id" SERIAL NOT NULL,
    "days" TEXT NOT NULL,
    "open" TEXT NOT NULL,
    "close" TEXT NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "practices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "practices" ADD CONSTRAINT "practices_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "profiles_doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
