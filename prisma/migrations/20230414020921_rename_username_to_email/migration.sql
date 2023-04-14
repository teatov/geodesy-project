/*
  Warnings:

  - You are about to drop the column `username` on the `auth_user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `auth_user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `auth_user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "auth_user_username_key";

-- AlterTable
ALTER TABLE "auth_user" DROP COLUMN "username",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "auth_user_email_key" ON "auth_user"("email");
