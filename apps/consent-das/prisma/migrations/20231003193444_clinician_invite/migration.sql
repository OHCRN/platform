-- CreateTable
CREATE TABLE "ClinicianInvite" (
    "id" TEXT NOT NULL,
    "clinicianFirstName" TEXT NOT NULL,
    "clinicianInstitutionalEmailAddress" TEXT NOT NULL,
    "clinicianLastName" TEXT NOT NULL,
    "clinicianTitle" TEXT NOT NULL,
    "consentGroup" "ConsentGroup" NOT NULL,
    "consentToBeContacted" BOOLEAN NOT NULL,
    "inviteSentDate" CHAR(10),
    "inviteAcceptedDate" CHAR(10),
    "inviteAccepted" BOOLEAN,

    CONSTRAINT "ClinicianInvite_pkey" PRIMARY KEY ("id")
);
