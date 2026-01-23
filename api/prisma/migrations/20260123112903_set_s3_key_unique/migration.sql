/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `documents` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "documents_key_key" ON "documents"("key");
