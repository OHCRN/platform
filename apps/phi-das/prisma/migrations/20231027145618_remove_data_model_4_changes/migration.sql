/*
  Warnings:

  - You are about to drop the column `selfReportedClinicianFirstName` on the `ClinicalProfile` table. All the data in the column will be lost.
  - You are about to drop the column `selfReportedClinicianLastName` on the `ClinicalProfile` table. All the data in the column will be lost.
  - You are about to drop the column `selfReportedClinicianTitleOrRole` on the `ClinicalProfile` table. All the data in the column will be lost.
  - You are about to drop the column `selfReportedGeneticsClinicVisited` on the `ClinicalProfile` table. All the data in the column will be lost.
  - You are about to drop the column `selfReportedMolecularLabVisited` on the `ClinicalProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ClinicalProfile" DROP COLUMN "selfReportedClinicianFirstName",
DROP COLUMN "selfReportedClinicianLastName",
DROP COLUMN "selfReportedClinicianTitleOrRole",
DROP COLUMN "selfReportedGeneticsClinicVisited",
DROP COLUMN "selfReportedMolecularLabVisited",
ADD COLUMN     "geneticsClinicVisited" "GeneticsClinic";

-- DropEnum
DROP TYPE "MolecularLab";
