/*
  Warnings:
  - Made the column `inviteSentDate` on table `ClinicianInvite` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ClinicianInvite" RENAME COLUMN "clinicianTitle" TO "clinicianTitleOrRole";
ALTER TABLE "ClinicianInvite" ALTER COLUMN "inviteSentDate" SET NOT NULL;
-- AlterTable
ALTER TABLE "ClinicianInvite" ALTER COLUMN "inviteAccepted" SET NOT NULL,
ALTER COLUMN "inviteAccepted" SET DEFAULT false;

