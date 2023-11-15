-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Video" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "video_id" TEXT NOT NULL,
    "title" TEXT,
    "transcription" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Video" ("createdAt", "id", "title", "transcription", "video_id") SELECT "createdAt", "id", "title", "transcription", "video_id" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
