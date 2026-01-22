-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'success', 'error');

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL DEFAULT 'pending',

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);
