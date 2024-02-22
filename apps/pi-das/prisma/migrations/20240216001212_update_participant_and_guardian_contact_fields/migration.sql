/*
  Warnings:

  - A unique constraint covering the columns `[participantEmailAddress]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[guardianEmailAddress]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[keycloakId]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `keycloakId` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Participant_emailAddress_key";

-- AlterTable
ALTER TABLE "Participant" RENAME COLUMN "emailAddress" TO "participantEmailAddress";
ALTER TABLE "Participant" RENAME COLUMN "phoneNumber" TO "participantPhoneNumber";

ALTER TABLE "Participant" ALTER COLUMN "participantEmailAddress" DROP NOT NULL,
ALTER COLUMN "participantPhoneNumber" DROP NOT NULL;

ALTER TABLE "Participant" ADD COLUMN "keycloakId" TEXT NOT NULL;
ALTER TABLE "Participant" ALTER COLUMN "residentialPostalCode" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Participant_participantEmailAddress_key" ON "Participant"("participantEmailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_guardianEmailAddress_key" ON "Participant"("guardianEmailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_keycloakId_key" ON "Participant"("keycloakId");
