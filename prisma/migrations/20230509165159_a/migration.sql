/*
  Warnings:

  - You are about to drop the column `satelliteObservabilityNotes` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `upperMarkAboveGroundHeight` on the `Survey` table. All the data in the column will be lost.
  - Added the required column `upperMarkBelowGroundHeight` to the `Survey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Survey" DROP COLUMN "satelliteObservabilityNotes",
DROP COLUMN "upperMarkAboveGroundHeight",
ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "upperMarkBelowGroundHeight" DOUBLE PRECISION NOT NULL;
