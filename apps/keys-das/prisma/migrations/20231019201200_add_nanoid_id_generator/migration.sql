/*
  Warnings:

  - The primary key for the `ClinicalProfileKey` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ClinicalProfileKey` table. All the data in the column will be lost.
  - You are about to alter the column `clinicalProfilePrivateKey` on the `ClinicalProfileKey` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(21)`.
  - The primary key for the `OhipKey` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `OhipKey` table. All the data in the column will be lost.
  - You are about to alter the column `ohipPrivateKey` on the `OhipKey` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(21)`.

*/
-- AlterTable
ALTER TABLE "ClinicalProfileKey" DROP CONSTRAINT "ClinicalProfileKey_pkey",
DROP COLUMN "id",
ALTER COLUMN "clinicalProfilePrivateKey" SET DEFAULT '',
ALTER COLUMN "clinicalProfilePrivateKey" SET DATA TYPE CHAR(21),
ADD CONSTRAINT "ClinicalProfileKey_pkey" PRIMARY KEY ("clinicalProfilePrivateKey");

-- AlterTable
ALTER TABLE "OhipKey" DROP CONSTRAINT "OhipKey_pkey",
DROP COLUMN "id",
ALTER COLUMN "ohipPrivateKey" SET DEFAULT '',
ALTER COLUMN "ohipPrivateKey" SET DATA TYPE CHAR(21),
ADD CONSTRAINT "OhipKey_pkey" PRIMARY KEY ("ohipPrivateKey");
