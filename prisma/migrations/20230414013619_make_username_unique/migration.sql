/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `auth_user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "auth_user_username_key" ON "auth_user"("username");
