-- CreateTable
CREATE TABLE "ClinicalProfileKey" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "clinicalProfilePrivateKey" TEXT NOT NULL,

    CONSTRAINT "ClinicalProfileKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClinicalProfileKey_participantId_key" ON "ClinicalProfileKey"("participantId");

-- CreateIndex
CREATE UNIQUE INDEX "ClinicalProfileKey_clinicalProfilePrivateKey_key" ON "ClinicalProfileKey"("clinicalProfilePrivateKey");
