-- CreateTable
CREATE TABLE "OhipKey" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "ohipPrivateKey" TEXT NOT NULL,

    CONSTRAINT "OhipKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OhipKey_participantId_key" ON "OhipKey"("participantId");

-- CreateIndex
CREATE UNIQUE INDEX "OhipKey_ohipPrivateKey_key" ON "OhipKey"("ohipPrivateKey");
