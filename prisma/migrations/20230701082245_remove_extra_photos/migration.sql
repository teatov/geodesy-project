/*
  Warnings:

  - You are about to drop the column `distance` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `extraSurveyId` on the `Photo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_extraSurveyId_fkey";

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "distance",
DROP COLUMN "extraSurveyId";
