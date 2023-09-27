/*
  Warnings:

  - The primary key for the `Participant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Participant` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Participant` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(64)`.
  - A unique constraint covering the columns `[emailAddress]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dateOfBirth` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participantOhipFirstName` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participantOhipLastName` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participantPreferredName` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `residentialPostalCode` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
DROP TABLE "Participant";

-- CreateTable
CREATE TABLE "Participant" (
  "id" VARCHAR(64) NOT NULL,
  "dateOfBirth" CHAR(10) NOT NULL,
  "emailAddress" TEXT NOT NULL,
  "guardianEmailAddress" TEXT,
  "guardianName" TEXT,
  "guardianPhoneNumber" CHAR(10),
  "guardianRelationship" TEXT,
  "inviteId" VARCHAR(64),
  "mailingAddressCity" TEXT,
  "mailingAddressPostalCode" CHAR(6),
  "mailingAddressProvince" TEXT,
  "mailingAddressStreet" TEXT,
  "participantOhipFirstName" TEXT NOT NULL,
  "participantOhipLastName" TEXT NOT NULL,
  "participantOhipMiddleName" TEXT,
  "participantPreferredName" TEXT NOT NULL,
  "phoneNumber" CHAR(10) NOT NULL,
  "residentialPostalCode" CHAR(6) NOT NULL,

  CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClinicianInvite" (
    "id" VARCHAR(64) NOT NULL,
    "participantFirstName" TEXT NOT NULL,
    "participantLastName" TEXT NOT NULL,
    "participantEmailAddress" TEXT NOT NULL,
    "participantPhoneNumber" CHAR(10) NOT NULL,
    "participantPreferredName" TEXT,
    "guardianName" TEXT,
    "guardianPhoneNumber" CHAR(10),
    "guardianEmailAddress" TEXT,
    "guardianRelationship" TEXT,

    CONSTRAINT "ClinicianInvite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClinicianInvite_participantEmailAddress_key" ON "ClinicianInvite"("participantEmailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_emailAddress_key" ON "Participant"("emailAddress");

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_inviteId_fkey" FOREIGN KEY ("inviteId") REFERENCES "ClinicianInvite"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
