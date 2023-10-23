/*
  Warnings:

  - Made the column `gender` on table `ClinicalProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ClinicalProfile" ALTER COLUMN "gender" SET NOT NULL;
