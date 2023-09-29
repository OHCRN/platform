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
