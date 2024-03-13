/*
  Warnings:

  - Added the required column `authorId` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorName` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "authorName" TEXT NOT NULL;
