/*
  Warnings:

  - You are about to drop the column `centerMarkPhotoId` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `exteriorPhotoId` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the `Photo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `centerMarkPhoto` to the `Survey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exteriorPhoto` to the `Survey` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Survey" DROP CONSTRAINT "Survey_centerMarkPhotoId_fkey";

-- DropForeignKey
ALTER TABLE "Survey" DROP CONSTRAINT "Survey_exteriorPhotoId_fkey";

-- AlterTable
ALTER TABLE "Survey" DROP COLUMN "centerMarkPhotoId",
DROP COLUMN "exteriorPhotoId",
ADD COLUMN     "centerMarkPhoto" TEXT NOT NULL,
ADD COLUMN     "exteriorPhoto" TEXT NOT NULL;

-- DropTable
DROP TABLE "Photo";
