-- AlterTable
ALTER TABLE "hospitals" ALTER COLUMN "doctor_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "practices" ALTER COLUMN "doctor_id" DROP NOT NULL;
