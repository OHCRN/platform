-- CreateTable
CREATE TABLE "ClinicianInvite" (
    "id" TEXT NOT NULL,
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

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_inviteId_fkey" FOREIGN KEY ("inviteId") REFERENCES "ClinicianInvite"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
