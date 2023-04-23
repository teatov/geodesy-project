/*
  Warnings:

  - Added the required column `latitude` to the `Survey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Survey` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `monolith1Integrity` on the `Survey` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `monolith2Openness` on the `Survey` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `monoliths3And4Openness` on the `Survey` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `orp1Integrity` on the `Survey` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `orp2Integrity` on the `Survey` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `outerSignIntegrity` on the `Survey` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `signPresence` on the `Survey` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `trenchReadability` on the `Survey` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `satelliteObservability` on the `Survey` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SignType" AS ENUM ('NA', 'SIGNAL_SIMPLE', 'SIGNAL_COMPLEX', 'PYRAMID_WOOD_THREE_SIDED', 'PYRAMID_WOOD_FOUR_SIDED', 'PYRAMID_METAL_THREE_SIDED', 'PYRAMID_METAL_FOUR_SIDED', 'STAND_WOOD_THREE_SIDED', 'STAND_WOOD_FOUR_SIDED', 'STAND_METAL_THREE_SIDED', 'STAND_METAL_FOUR_SIDED', 'POST_CONCRETE', 'POST_ROCK', 'POST_BRICH');

-- CreateEnum
CREATE TYPE "PresenceState" AS ENUM ('NA', 'MISSING', 'PRESENT');

-- CreateEnum
CREATE TYPE "IntegrityState" AS ENUM ('NA', 'INTACT', 'NOT_INTACT');

-- CreateEnum
CREATE TYPE "OpennessState" AS ENUM ('NA', 'OPENED', 'NOT_CLOSED');

-- CreateEnum
CREATE TYPE "ReadabilityState" AS ENUM ('NA', 'READABLE', 'UNREADABLE');

-- CreateEnum
CREATE TYPE "ObservabilityState" AS ENUM ('NA', 'OBSERVABLE', 'CONDITIONALLY_OBSERVABLE', 'UNOBSERVABLE');

-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "distance" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Survey" ADD COLUMN     "extraNotes" TEXT,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "satelliteObservabilityNotes" TEXT,
DROP COLUMN "monolith1Integrity",
ADD COLUMN     "monolith1Integrity" "IntegrityState" NOT NULL,
DROP COLUMN "monolith2Openness",
ADD COLUMN     "monolith2Openness" "OpennessState" NOT NULL,
DROP COLUMN "monoliths3And4Openness",
ADD COLUMN     "monoliths3And4Openness" "OpennessState" NOT NULL,
DROP COLUMN "orp1Integrity",
ADD COLUMN     "orp1Integrity" "IntegrityState" NOT NULL,
DROP COLUMN "orp2Integrity",
ADD COLUMN     "orp2Integrity" "IntegrityState" NOT NULL,
DROP COLUMN "outerSignIntegrity",
ADD COLUMN     "outerSignIntegrity" "IntegrityState" NOT NULL,
DROP COLUMN "signPresence",
ADD COLUMN     "signPresence" "PresenceState" NOT NULL,
DROP COLUMN "trenchReadability",
ADD COLUMN     "trenchReadability" "ReadabilityState" NOT NULL,
DROP COLUMN "satelliteObservability",
ADD COLUMN     "satelliteObservability" "ObservabilityState" NOT NULL;

-- DropEnum
DROP TYPE "MarkerIntegrityState";

-- DropEnum
DROP TYPE "MarkerObservabilityState";

-- DropEnum
DROP TYPE "MarkerOpennessState";

-- DropEnum
DROP TYPE "MarkerPresenceState";

-- DropEnum
DROP TYPE "MarkerReadabilityState";
