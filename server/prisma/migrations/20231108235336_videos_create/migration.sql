/*
  Warnings:

  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Video";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Videos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "videoID" TEXT NOT NULL,
    "title" TEXT,
    "transcription" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
