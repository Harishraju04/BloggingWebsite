/*
  Warnings:

  - Added the required column `tag` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "tag" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "description" TEXT NOT NULL;
