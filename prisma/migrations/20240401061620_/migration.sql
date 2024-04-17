-- CreateTable
CREATE TABLE "biodata" (
    "id" SERIAL NOT NULL,
    "experience" TEXT,
    "education" TEXT,
    "oraganization" TEXT,
    "language" TEXT,
    "doctorId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "biodata_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "biodata" ADD CONSTRAINT "biodata_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "profiles_doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
