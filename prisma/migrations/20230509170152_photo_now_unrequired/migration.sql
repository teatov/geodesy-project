-- DropForeignKey
ALTER TABLE "Survey" DROP CONSTRAINT "Survey_centerMarkPhotoId_fkey";

-- DropForeignKey
ALTER TABLE "Survey" DROP CONSTRAINT "Survey_exteriorPhotoId_fkey";

-- AlterTable
ALTER TABLE "Survey" ALTER COLUMN "centerMarkPhotoId" DROP NOT NULL,
ALTER COLUMN "exteriorPhotoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Survey" ADD CONSTRAINT "Survey_centerMarkPhotoId_fkey" FOREIGN KEY ("centerMarkPhotoId") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Survey" ADD CONSTRAINT "Survey_exteriorPhotoId_fkey" FOREIGN KEY ("exteriorPhotoId") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
