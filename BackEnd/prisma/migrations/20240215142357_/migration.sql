/*
  Warnings:

  - You are about to drop the column `description` on the `profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "description";

-- CreateTable
CREATE TABLE "profiles_Doctor" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "picture" TEXT,
    "description" TEXT,
    "city" TEXT,
    "province" TEXT,
    "country" TEXT,
    "users_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_Doctor_users_id_key" ON "profiles_Doctor"("users_id");

-- AddForeignKey
ALTER TABLE "profiles_Doctor" ADD CONSTRAINT "profiles_Doctor_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
