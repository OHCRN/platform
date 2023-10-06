-- CreateEnum
CREATE TYPE "BirthSex" AS ENUM ('FEMALE', 'INTERSEX', 'MALE', 'PREFER_NOT_TO_ANSWER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('GENDER_FLUID', 'GENDER_QUEER', 'MAN', 'NON_BINARY', 'PREFER_NOT_TO_ANSWER', 'PREFER_TO_SELF_IDENTIFY', 'QUESTIONING', 'TRANSGENDER_MAN_TRANSMAN', 'TRANSGENDER_WOMAN_TRANSWOMAN', 'TWO_SPIRIT', 'WOMAN');

-- CreateEnum
CREATE TYPE "HistoryOfCancer" AS ENUM ('YES', 'NO', 'UNKNOWN');

-- CreateTable
CREATE TABLE "ClinicalProfile" (
    "id" TEXT NOT NULL,
    "ancestry" TEXT NOT NULL,
    "birthSex" "BirthSex" NOT NULL,
    "familyHistoryOfCancer" "HistoryOfCancer" NOT NULL,
    "gender" "Gender",
    "geneticsClinicVisited" TEXT NOT NULL,
    "historyOfCancer" "HistoryOfCancer" NOT NULL,
    "participantId" TEXT NOT NULL,
    "selfIdentifiedGender" TEXT,

    CONSTRAINT "ClinicalProfile_pkey" PRIMARY KEY ("id")
);
