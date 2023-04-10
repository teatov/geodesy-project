-- CreateEnum
CREATE TYPE "MarkerPresenceState" AS ENUM ('MISSING', 'PRESENT');

-- CreateEnum
CREATE TYPE "MarkerIntegrityState" AS ENUM ('INTACT', 'NOT_INTACT');

-- CreateEnum
CREATE TYPE "MarkerOpennessState" AS ENUM ('OPENED', 'NOT_CLOSED');

-- CreateEnum
CREATE TYPE "MarkerReadabilityState" AS ENUM ('READABLE', 'UNREADABLE');

-- CreateEnum
CREATE TYPE "MarkerObservabilityState" AS ENUM ('OBSERVABLE', 'CONDITIONALLY_OBSERVABLE', 'UNOBSERVABLE');

-- CreateTable
CREATE TABLE "Record" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Survey" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "federalSubject" TEXT NOT NULL,
    "workBy" TEXT NOT NULL,
    "markerIndex" TEXT NOT NULL,
    "markerName" TEXT NOT NULL,
    "placingYear" INTEGER NOT NULL,
    "signType" TEXT NOT NULL,
    "signHeight" INTEGER NOT NULL,
    "centerType" TEXT NOT NULL,
    "altitude" INTEGER NOT NULL,
    "trapezes" TEXT NOT NULL,
    "signIsPlaced" "MarkerPresenceState" NOT NULL,
    "monolith1IsIntact" "MarkerIntegrityState" NOT NULL,
    "monolith2IsOpened" "MarkerOpennessState" NOT NULL,
    "monoliths3And4AreOpened" "MarkerOpennessState" NOT NULL,
    "outerSignIsIntact" "MarkerIntegrityState" NOT NULL,
    "orp1IsIntact" "MarkerIntegrityState" NOT NULL,
    "orp2IsIntact" "MarkerIntegrityState" NOT NULL,
    "trenchIsReadable" "MarkerReadabilityState" NOT NULL,
    "centerMarkPhoto" TEXT NOT NULL,
    "exteriorPhoto" TEXT NOT NULL,
    "upperMarkBelowGroundHeight" TEXT NOT NULL,
    "satelliteObservability" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "approvedBy" TEXT NOT NULL,

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("id")
);
