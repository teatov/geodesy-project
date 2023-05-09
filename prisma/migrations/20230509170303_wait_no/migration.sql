/*
  Warnings:

  - Made the column `centerMarkPhotoId` on table `Survey` required. This step will fail if there are existing NULL values in that column.
  - Made the column `exteriorPhotoId` on table `Survey` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Survey" DROP CONSTRAINT "Survey_centerMarkPhotoId_fkey";

-- DropForeignKey
ALTER TABLE "Survey" DROP CONSTRAINT "Survey_exteriorPhotoId_fkey";

-- AlterTable
ALTER TABLE "Survey" ALTER COLUMN "centerMarkPhotoId" SET NOT NULL,
ALTER COLUMN "exteriorPhotoId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Survey" ADD CONSTRAINT "Survey_centerMarkPhotoId_fkey" FOREIGN KEY ("centerMarkPhotoId") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Survey" ADD CONSTRAINT "Survey_exteriorPhotoId_fkey" FOREIGN KEY ("exteriorPhotoId") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
