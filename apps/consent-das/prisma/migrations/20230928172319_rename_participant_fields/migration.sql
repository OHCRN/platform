-- AlterTable
ALTER TABLE "Participant" RENAME COLUMN "registeringOnBehalfOfSomeoneElse" TO "isGuardian";
ALTER TABLE "Participant" RENAME COLUMN "registrantIdVerified" TO "guardianIdVerified";
