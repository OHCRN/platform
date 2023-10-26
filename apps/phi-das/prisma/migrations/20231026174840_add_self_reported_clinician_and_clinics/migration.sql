/*
  Warnings:

  - You are about to drop the column `geneticsClinicVisited` on the `ClinicalProfile` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "MolecularLab" AS ENUM ('CHILDRENS_HOSPITAL_OF_EASTERN_ONTARIO_OTTAWA', 'HAMILTON_HEALTH_SCIENCES_HAMILTON', 'HOSPITAL_FOR_SICK_CHILDREN_TORONTO', 'KINGSTON_HEALTH_SCIENCES_CENTRE_KINGSTON', 'LONDON_HEALTH_SCIENCES_CENTRE_LONDON', 'NORTH_YORK_GENERAL_HOSPITAL_TORONTO', 'SINAI_HEALTH_SYSTEM_TORONTO', 'TRILLIUM_HEALTH_PARTNERS_MISSISSAUGA', 'UNIVERSITY_HEALTH_NETWORK_TORONTO');

-- AlterTable
ALTER TABLE "ClinicalProfile" DROP COLUMN "geneticsClinicVisited",
ADD COLUMN     "selfReportedClinicianFirstName" TEXT,
ADD COLUMN     "selfReportedClinicianLastName" TEXT,
ADD COLUMN     "selfReportedClinicianTitleOrRole" TEXT,
ADD COLUMN     "selfReportedGeneticsClinic" "GeneticsClinic",
ADD COLUMN     "selfReportedMolecularLab" "MolecularLab";
