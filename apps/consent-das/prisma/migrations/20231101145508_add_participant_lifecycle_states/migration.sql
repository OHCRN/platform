-- CreateEnum
CREATE TYPE "LifecycleState" AS ENUM ('REGISTERED', 'CONSENTED', 'IN_PROCESSING', 'PROFILE_COMPLETE', 'PUBLISHED', 'DELETION_REQUESTED', 'PAUSE_REQUESTED', 'CHANGE_REQUESTED', 'APPROVED_FOR_DELETION', 'PAUSED', 'DELETED');

-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "currentLifecycleState" "LifecycleState" NOT NULL DEFAULT 'REGISTERED',
ADD COLUMN     "previousLifecycleState" "LifecycleState";
