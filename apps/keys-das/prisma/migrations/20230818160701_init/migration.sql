-- CreateTable
CREATE TABLE "Ohip" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "ohipPrivateKey" TEXT NOT NULL,

    CONSTRAINT "Ohip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ohip_participantId_key" ON "Ohip"("participantId");

-- CreateIndex
CREATE UNIQUE INDEX "Ohip_ohipPrivateKey_key" ON "Ohip"("ohipPrivateKey");
