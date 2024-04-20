-- AlterTable
ALTER TABLE "symptom" ADD COLUMN     "probability" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "diseases" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "probability" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "diseases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RuleBase" (
    "id" SERIAL NOT NULL,
    "diseases_id" INTEGER NOT NULL,
    "symptom_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RuleBase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RuleBase" ADD CONSTRAINT "RuleBase_diseases_id_fkey" FOREIGN KEY ("diseases_id") REFERENCES "diseases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuleBase" ADD CONSTRAINT "RuleBase_symptom_id_fkey" FOREIGN KEY ("symptom_id") REFERENCES "symptom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
