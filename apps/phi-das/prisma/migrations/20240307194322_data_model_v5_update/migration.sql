-- CreateEnum
CREATE TYPE "VitalStatus" AS ENUM ('ALIVE', 'DECEASED');

-- AlterTable
ALTER TABLE "ClinicalProfile" ADD COLUMN     "vitalStatus" "VitalStatus";
