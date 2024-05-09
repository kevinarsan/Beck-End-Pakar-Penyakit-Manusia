-- AlterTable
ALTER TABLE "Diagnoses" ADD COLUMN     "description" TEXT,
ADD COLUMN     "solution" TEXT;

-- AlterTable
ALTER TABLE "teams" ALTER COLUMN "picture" DROP NOT NULL;
