-- DropForeignKey
ALTER TABLE "diagnoses_to_symptom" DROP CONSTRAINT "diagnoses_to_symptom_symptom_id_fkey";

-- AlterTable
ALTER TABLE "diagnoses_to_symptom" ALTER COLUMN "symptom_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "diagnoses_to_symptom" ADD CONSTRAINT "diagnoses_to_symptom_symptom_id_fkey" FOREIGN KEY ("symptom_id") REFERENCES "symptom"("id") ON DELETE SET NULL ON UPDATE CASCADE;
