/*
  Warnings:

  - You are about to drop the column `centerMarkPhoto` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `exteriorPhoto` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `federalSubject` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `monolith1IsIntact` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `monolith2IsOpened` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `monoliths3And4AreOpened` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `orp1IsIntact` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `orp2IsIntact` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `outerSignIsIntact` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `signIsPlaced` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `trenchIsReadable` on the `Survey` table. All the data in the column will be lost.
  - Added the required column `centerMarkPhotoId` to the `Survey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exteriorPhotoId` to the `Survey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `federalSubjectCode` to the `Survey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monolith1Integrity` to the `Survey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monolith2Openness` to the `Survey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monoliths3And4Openness` to the `Survey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orp1Integrity` to the `Survey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orp2Integrity` to the `Survey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `outerSignIntegrity` to the `Survey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signPresence` to the `Survey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surveyDate` to the `Survey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trenchReadability` to the `Survey` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `upperMarkBelowGroundHeight` on the `Survey` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `satelliteObservability` on the `Survey` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
ALTER TYPE "MarkerIntegrityState" ADD VALUE 'NA';

-- AlterEnum
ALTER TYPE "MarkerObservabilityState" ADD VALUE 'NA';

-- AlterEnum
ALTER TYPE "MarkerOpennessState" ADD VALUE 'NA';

-- AlterEnum
ALTER TYPE "MarkerPresenceState" ADD VALUE 'NA';

-- AlterEnum
ALTER TYPE "MarkerReadabilityState" ADD VALUE 'NA';

-- AlterTable
ALTER TABLE "Survey" DROP COLUMN "centerMarkPhoto",
DROP COLUMN "exteriorPhoto",
DROP COLUMN "federalSubject",
DROP COLUMN "monolith1IsIntact",
DROP COLUMN "monolith2IsOpened",
DROP COLUMN "monoliths3And4AreOpened",
DROP COLUMN "orp1IsIntact",
DROP COLUMN "orp2IsIntact",
DROP COLUMN "outerSignIsIntact",
DROP COLUMN "signIsPlaced",
DROP COLUMN "trenchIsReadable",
ADD COLUMN     "centerMarkPhotoId" TEXT NOT NULL,
ADD COLUMN     "exteriorPhotoId" TEXT NOT NULL,
ADD COLUMN     "federalSubjectCode" INTEGER NOT NULL,
ADD COLUMN     "monolith1Integrity" "MarkerIntegrityState" NOT NULL,
ADD COLUMN     "monolith2Openness" "MarkerOpennessState" NOT NULL,
ADD COLUMN     "monoliths3And4Openness" "MarkerOpennessState" NOT NULL,
ADD COLUMN     "orp1Integrity" "MarkerIntegrityState" NOT NULL,
ADD COLUMN     "orp2Integrity" "MarkerIntegrityState" NOT NULL,
ADD COLUMN     "outerSignIntegrity" "MarkerIntegrityState" NOT NULL,
ADD COLUMN     "signPresence" "MarkerPresenceState" NOT NULL,
ADD COLUMN     "surveyDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "trenchReadability" "MarkerReadabilityState" NOT NULL,
ALTER COLUMN "markerIndex" DROP NOT NULL,
ALTER COLUMN "placingYear" DROP NOT NULL,
ALTER COLUMN "signHeight" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "centerType" DROP NOT NULL,
ALTER COLUMN "altitude" DROP NOT NULL,
ALTER COLUMN "trapezes" DROP NOT NULL,
DROP COLUMN "upperMarkBelowGroundHeight",
ADD COLUMN     "upperMarkBelowGroundHeight" DOUBLE PRECISION NOT NULL,
DROP COLUMN "satelliteObservability",
ADD COLUMN     "satelliteObservability" "MarkerObservabilityState" NOT NULL,
ALTER COLUMN "approvedBy" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "extraSurveyId" TEXT,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FederalDistrict" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "FederalDistrict_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FederalSubject" (
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "federalDistrictId" INTEGER NOT NULL,

    CONSTRAINT "FederalSubject_pkey" PRIMARY KEY ("code")
);

-- AddForeignKey
ALTER TABLE "Survey" ADD CONSTRAINT "Survey_federalSubjectCode_fkey" FOREIGN KEY ("federalSubjectCode") REFERENCES "FederalSubject"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Survey" ADD CONSTRAINT "Survey_centerMarkPhotoId_fkey" FOREIGN KEY ("centerMarkPhotoId") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Survey" ADD CONSTRAINT "Survey_exteriorPhotoId_fkey" FOREIGN KEY ("exteriorPhotoId") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_extraSurveyId_fkey" FOREIGN KEY ("extraSurveyId") REFERENCES "Survey"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FederalSubject" ADD CONSTRAINT "FederalSubject_federalDistrictId_fkey" FOREIGN KEY ("federalDistrictId") REFERENCES "FederalDistrict"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
