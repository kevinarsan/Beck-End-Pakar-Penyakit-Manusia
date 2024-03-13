-- CreateTable
CREATE TABLE "(faq)" (
    "id" SERIAL NOT NULL,
    "pertanyaan" TEXT NOT NULL,
    "jawaban" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "(faq)_pkey" PRIMARY KEY ("id")
);
