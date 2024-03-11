-- CreateTable
CREATE TABLE "tutorial" (
    "id" SERIAL NOT NULL,
    "linkVideo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tutorial_pkey" PRIMARY KEY ("id")
);
