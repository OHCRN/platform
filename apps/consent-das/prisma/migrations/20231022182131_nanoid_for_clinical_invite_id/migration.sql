/*
  Warnings:

  - The primary key for the `ClinicianInvite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ClinicianInvite` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(21)`.

*/
-- AlterTable
ALTER TABLE "ClinicianInvite" DROP CONSTRAINT "ClinicianInvite_pkey",
ALTER COLUMN "id" SET DEFAULT '',
ALTER COLUMN "id" SET DATA TYPE CHAR(21),
ADD CONSTRAINT "ClinicianInvite_pkey" PRIMARY KEY ("id");
