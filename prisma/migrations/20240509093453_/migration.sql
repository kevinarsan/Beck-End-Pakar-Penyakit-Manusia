/*
  Warnings:

  - You are about to drop the column `symptom_id` on the `Diagnoses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Diagnoses" DROP CONSTRAINT "Diagnoses_symptom_id_fkey";

-- AlterTable
ALTER TABLE "Diagnoses" DROP COLUMN "symptom_id";

-- CreateTable
CREATE TABLE "diagnoses_to_symptom" (
    "id" SERIAL NOT NULL,
    "diagnoses_id" INTEGER NOT NULL,
    "symptom_id" INTEGER NOT NULL,

    CONSTRAINT "diagnoses_to_symptom_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "diagnoses_to_symptom" ADD CONSTRAINT "diagnoses_to_symptom_symptom_id_fkey" FOREIGN KEY ("symptom_id") REFERENCES "symptom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnoses_to_symptom" ADD CONSTRAINT "diagnoses_to_symptom_diagnoses_id_fkey" FOREIGN KEY ("diagnoses_id") REFERENCES "Diagnoses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
