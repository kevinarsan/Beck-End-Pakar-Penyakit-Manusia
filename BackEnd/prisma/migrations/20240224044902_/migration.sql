-- CreateTable
CREATE TABLE "practice_on_doctor" (
    "doctorId" INTEGER NOT NULL,
    "practiceId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "practice_on_doctor_pkey" PRIMARY KEY ("doctorId","practiceId")
);

-- AddForeignKey
ALTER TABLE "practice_on_doctor" ADD CONSTRAINT "practice_on_doctor_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "profiles_doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_on_doctor" ADD CONSTRAINT "practice_on_doctor_practiceId_fkey" FOREIGN KEY ("practiceId") REFERENCES "practices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
