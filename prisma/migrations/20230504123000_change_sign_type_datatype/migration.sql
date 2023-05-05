/*
  Warnings:

  - Changed the type of `signType` on the `Survey` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Survey" DROP COLUMN "signType",
ADD COLUMN     "signType" "SignType" NOT NULL;
