/*
  Warnings:

  - The primary key for the `ClinicalProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ClinicalProfile` table. All the data in the column will be lost.
  - You are about to drop the column `participantId` on the `ClinicalProfile` table. All the data in the column will be lost.
  - The primary key for the `Ohip` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Ohip` table. All the data in the column will be lost.
  - You are about to alter the column `ohipPrivateKey` on the `Ohip` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(21)`.
  - Added the required column `clinicalProfilePrivateKey` to the `ClinicalProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Ohip_ohipPrivateKey_key";

-- AlterTable
ALTER TABLE "ClinicalProfile" DROP CONSTRAINT "ClinicalProfile_pkey",
DROP COLUMN "id",
DROP COLUMN "participantId",
ADD COLUMN     "clinicalProfilePrivateKey" CHAR(21) NOT NULL,
ADD CONSTRAINT "ClinicalProfile_pkey" PRIMARY KEY ("clinicalProfilePrivateKey");

-- AlterTable
ALTER TABLE "Ohip" DROP CONSTRAINT "Ohip_pkey",
DROP COLUMN "id",
ALTER COLUMN "ohipPrivateKey" SET DATA TYPE CHAR(21),
ADD CONSTRAINT "Ohip_pkey" PRIMARY KEY ("ohipPrivateKey");
