-- AlterTable
ALTER TABLE "Diagnoses" ADD COLUMN     "usersId" INTEGER;

-- AddForeignKey
ALTER TABLE "Diagnoses" ADD CONSTRAINT "Diagnoses_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
