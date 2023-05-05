/*
  Warnings:

  - You are about to drop the column `upperMarkBelowGroundHeight` on the `Survey` table. All the data in the column will be lost.
  - Added the required column `upperMarkAboveGroundHeight` to the `Survey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Survey" DROP COLUMN "upperMarkBelowGroundHeight",
ADD COLUMN     "upperMarkAboveGroundHeight" DOUBLE PRECISION NOT NULL;
