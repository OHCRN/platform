-- CreateTable
CREATE TABLE "Ohip" (
    "id" TEXT NOT NULL,
    "ohipPrivateKey" TEXT NOT NULL,
    "ohipNumber" TEXT NOT NULL,

    CONSTRAINT "Ohip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ohip_ohipPrivateKey_key" ON "Ohip"("ohipPrivateKey");

-- CreateIndex
CREATE UNIQUE INDEX "Ohip_ohipNumber_key" ON "Ohip"("ohipNumber");
