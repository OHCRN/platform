-- CreateEnum
CREATE TYPE "ConsentCategory" AS ENUM ('INFORMED_CONSENT', 'CONSENT_RELEASE_DATA', 'CONSENT_RESEARCH_PARTICIPATION', 'CONSENT_RECONTACT', 'CONSENT_REVIEW_SIGN');

-- CreateTable
CREATE TABLE "ConsentQuestion" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" "ConsentCategory" NOT NULL,

    CONSTRAINT "ConsentQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipantResponse" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "consentQuestionId" TEXT NOT NULL,
    "response" BOOLEAN NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ParticipantResponse_pkey" PRIMARY KEY ("id","participantId","consentQuestionId")
);

-- AddForeignKey
ALTER TABLE "ParticipantResponse" ADD CONSTRAINT "ParticipantResponse_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "ParticipantResponse" ADD CONSTRAINT "ParticipantResponse_consentQuestionId_fkey" FOREIGN KEY ("consentQuestionId") REFERENCES "ConsentQuestion"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
