/*
  Warnings:

  - The primary key for the `Participant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Participant` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(21)`.

*/

-- AlterTable
ALTER TABLE "ParticipantResponse" DROP CONSTRAINT "ParticipantResponse_participantId_fkey";

-- AlterTable
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_pkey",
ALTER COLUMN "id" SET DEFAULT '',
ALTER COLUMN "id" SET DATA TYPE CHAR(21),
ADD CONSTRAINT "Participant_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "ParticipantResponse" ADD CONSTRAINT "ParticipantResponse_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
