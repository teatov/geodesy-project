/*
  Warnings:

  - The values [NOT_CLOSED] on the enum `OpennessState` will be removed. If these variants are still used in the database, this will fail.
  - The values [POST_BRICH] on the enum `SignType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OpennessState_new" AS ENUM ('NA', 'OPENED', 'NOT_OPENED');
ALTER TABLE "Survey" ALTER COLUMN "monolith2Openness" TYPE "OpennessState_new" USING ("monolith2Openness"::text::"OpennessState_new");
ALTER TABLE "Survey" ALTER COLUMN "monoliths3And4Openness" TYPE "OpennessState_new" USING ("monoliths3And4Openness"::text::"OpennessState_new");
ALTER TYPE "OpennessState" RENAME TO "OpennessState_old";
ALTER TYPE "OpennessState_new" RENAME TO "OpennessState";
DROP TYPE "OpennessState_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SignType_new" AS ENUM ('NA', 'SIGNAL_SIMPLE', 'SIGNAL_COMPLEX', 'PYRAMID_WOOD_THREE_SIDED', 'PYRAMID_WOOD_FOUR_SIDED', 'PYRAMID_METAL_THREE_SIDED', 'PYRAMID_METAL_FOUR_SIDED', 'STAND_WOOD_THREE_SIDED', 'STAND_WOOD_FOUR_SIDED', 'STAND_METAL_THREE_SIDED', 'STAND_METAL_FOUR_SIDED', 'POST_CONCRETE', 'POST_ROCK', 'POST_BRICK');
ALTER TABLE "Survey" ALTER COLUMN "signType" TYPE "SignType_new" USING ("signType"::text::"SignType_new");
ALTER TYPE "SignType" RENAME TO "SignType_old";
ALTER TYPE "SignType_new" RENAME TO "SignType";
DROP TYPE "SignType_old";
COMMIT;
