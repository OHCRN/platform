-- DropTable
DROP TABLE "Participant";

-- CreateEnum
CREATE TYPE "Province" AS ENUM ('ALBERTA', 'BRITISH_COLUMBIA', 'MANITOBA', 'NEW_BRUNSWICK', 'NEWFOUNDLAND_AND_LABRADOR', 'NORTHWEST_TERRITORIES', 'NOVA_SCOTIA', 'NUNAVUT', 'ONTARIO', 'PRINCE_EDWARD_ISLAND', 'QUEBEC', 'SASKATCHEWAN', 'YUKON');

-- CreateTable
CREATE TABLE "Participant" (
  "id" TEXT NOT NULL,
  "dateOfBirth" DATE NOT NULL,
  "emailAddress" TEXT NOT NULL,
  "guardianEmailAddress" TEXT,
  "guardianName" TEXT,
  "guardianPhoneNumber" CHAR(10),
  "guardianRelationship" TEXT,
  "inviteId" TEXT,
  "mailingAddressCity" TEXT,
  "mailingAddressPostalCode" CHAR(6),
  "mailingAddressProvince" "Province",
  "mailingAddressStreet" TEXT,
  "participantOhipFirstName" TEXT NOT NULL,
  "participantOhipLastName" TEXT NOT NULL,
  "participantOhipMiddleName" TEXT,
  "participantPreferredName" TEXT NOT NULL,
  "phoneNumber" CHAR(10) NOT NULL,
  "residentialPostalCode" CHAR(6) NOT NULL,

  CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_emailAddress_key" ON "Participant"("emailAddress");
