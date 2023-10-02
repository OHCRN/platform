/*
  Warnings:

  - You are about to drop the column `participantId` on the `Participant` table. All the data in the column will be lost.
  - Added the required column `registeringOnBehalfOfSomeoneElse` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ConsentGroup" AS ENUM ('ADULT_CONSENT', 'ADULT_CONSENT_SUBSTITUTE_DECISION_MAKER', 'GUARDIAN_CONSENT_OF_MINOR', 'GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT', 'YOUNG_ADULT_CONSENT');

-- DropIndex
DROP INDEX "Participant_participantId_key";

-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "participantId",
ADD COLUMN     "consentGroup" "ConsentGroup",
ADD COLUMN     "registeringOnBehalfOfSomeoneElse" BOOLEAN NOT NULL,
ADD COLUMN     "registrantIdVerified" BOOLEAN;
