-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_participantId_key" ON "Participant"("participantId");
