-- CreateTable
CREATE TABLE "ClinicianInvite" (
    "id" TEXT NOT NULL,
    "clinicianFirstName" TEXT NOT NULL,
    "clinicianInstitutionalEmailAddress" TEXT NOT NULL,
    "clinicianLastName" TEXT NOT NULL,
    "clinicianTitle" TEXT NOT NULL,
    "consentGroup" "ConsentGroup" NOT NULL,
    "consentToBeContacted" BOOLEAN NOT NULL,
    "inviteSentDate" TIMESTAMP(3),
    "inviteAcceptedDate" TIMESTAMP(3),
    "inviteAccepted" BOOLEAN,

    CONSTRAINT "ClinicianInvite_pkey" PRIMARY KEY ("id")
);
