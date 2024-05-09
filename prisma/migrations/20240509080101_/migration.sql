/*
  Warnings:

  - You are about to drop the column `probability` on the `diseases` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "diseases" DROP COLUMN "probability",
ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "Diagnoses" (
    "id" SERIAL NOT NULL,
    "diseases_id" INTEGER,
    "symptom_id" INTEGER,
    "probability_result" DOUBLE PRECISION,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Diagnoses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Diagnoses" ADD CONSTRAINT "Diagnoses_diseases_id_fkey" FOREIGN KEY ("diseases_id") REFERENCES "diseases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnoses" ADD CONSTRAINT "Diagnoses_symptom_id_fkey" FOREIGN KEY ("symptom_id") REFERENCES "symptom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
