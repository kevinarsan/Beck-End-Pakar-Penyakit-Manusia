/*
  Warnings:

  - You are about to drop the column `education` on the `biodata` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `biodata` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "biodata" DROP COLUMN "education",
DROP COLUMN "experience";

-- CreateTable
CREATE TABLE "experince" (
    "id" SERIAL NOT NULL,
    "position" TEXT,
    "office" TEXT,
    "year" TEXT,
    "doctorId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "experince_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "education" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "program_studi" TEXT,
    "year" TEXT,
    "doctorId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "education_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "experince" ADD CONSTRAINT "experince_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "profiles_doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education" ADD CONSTRAINT "education_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "profiles_doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
