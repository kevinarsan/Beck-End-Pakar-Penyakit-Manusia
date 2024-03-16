-- AlterTable
ALTER TABLE "ratings" ADD COLUMN     "doctor_id" INTEGER;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "profiles_doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
