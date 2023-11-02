/*
  Warnings:

  - The primary key for the `ConsentQuestion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ParticipantResponse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `ConsentQuestion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `consentQuestionId` on the `ParticipantResponse` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ConsentQuestionId" AS ENUM ('INFORMED_CONSENT__READ_AND_UNDERSTAND', 'RELEASE_DATA__CLINICAL_AND_GENETIC', 'RELEASE_DATA__DE_IDENTIFIED', 'RESEARCH_PARTICIPATION__FUTURE_RESEARCH', 'RESEARCH_PARTICIPATION__CONTACT_INFORMATION', 'RECONTACT__FUTURE_RESEARCH', 'RECONTACT__SECONDARY_CONTACT', 'REVIEW_SIGN__SIGNED');

-- DropForeignKey
ALTER TABLE "ParticipantResponse" DROP CONSTRAINT "ParticipantResponse_consentQuestionId_fkey";

-- AlterTable
ALTER TABLE "ConsentQuestion" DROP CONSTRAINT "ConsentQuestion_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" "ConsentQuestionId" NOT NULL,
ADD CONSTRAINT "ConsentQuestion_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ParticipantResponse" DROP CONSTRAINT "ParticipantResponse_pkey",
DROP COLUMN "consentQuestionId",
ADD COLUMN     "consentQuestionId" "ConsentQuestionId" NOT NULL,
ADD CONSTRAINT "ParticipantResponse_pkey" PRIMARY KEY ("id", "participantId", "consentQuestionId");

-- AddForeignKey
ALTER TABLE "ParticipantResponse" ADD CONSTRAINT "ParticipantResponse_consentQuestionId_fkey" FOREIGN KEY ("consentQuestionId") REFERENCES "ConsentQuestion"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
