-- CreateTable
CREATE TABLE "hospital_on_doctor" (
    "doctorId" INTEGER NOT NULL,
    "hospitalId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hospital_on_doctor_pkey" PRIMARY KEY ("doctorId","hospitalId")
);

-- AddForeignKey
ALTER TABLE "hospital_on_doctor" ADD CONSTRAINT "hospital_on_doctor_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "profiles_doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hospital_on_doctor" ADD CONSTRAINT "hospital_on_doctor_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospitals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
