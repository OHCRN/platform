/*
  Warnings:

  - Made the column `inviteSentDate` on table `ClinicianInvite` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ClinicianInvite" ALTER COLUMN "inviteSentDate" SET NOT NULL;
