/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Notes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Notes" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Notes_title_key" ON "Notes"("title");
