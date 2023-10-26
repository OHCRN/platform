/*
  Warnings:

  - You are about to drop the column `selfReportedGeneticsClinic` on the `ClinicalProfile` table. All the data in the column will be lost.
  - You are about to drop the column `selfReportedMolecularLab` on the `ClinicalProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ClinicalProfile" DROP COLUMN "selfReportedGeneticsClinic",
DROP COLUMN "selfReportedMolecularLab",
ADD COLUMN     "selfReportedGeneticsClinicVisited" "GeneticsClinic",
ADD COLUMN     "selfReportedMolecularLabVisited" "MolecularLab";
