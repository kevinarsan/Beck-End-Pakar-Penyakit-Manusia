/*
  Warnings:

  - You are about to drop the `experince` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "experince" DROP CONSTRAINT "experince_doctorId_fkey";

-- DropTable
DROP TABLE "experince";

-- CreateTable
CREATE TABLE "experience" (
    "id" SERIAL NOT NULL,
    "position" TEXT,
    "office" TEXT,
    "year" TEXT,
    "doctorId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "experience_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "experience" ADD CONSTRAINT "experience_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "profiles_doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
