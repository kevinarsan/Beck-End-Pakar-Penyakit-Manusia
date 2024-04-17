-- CreateTable
CREATE TABLE "symptom" (
    "id" SERIAL NOT NULL,
    "naem" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "symptom_pkey" PRIMARY KEY ("id")
);
