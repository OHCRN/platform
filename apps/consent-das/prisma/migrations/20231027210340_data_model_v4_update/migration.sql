/*
  Warnings:

  - Made the column `consentGroup` on table `Participant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Participant" ALTER COLUMN "consentGroup" SET NOT NULL;
