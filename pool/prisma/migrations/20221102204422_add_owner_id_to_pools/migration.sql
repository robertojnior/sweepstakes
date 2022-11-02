-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pools" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "owner_id" TEXT,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "pools_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_pools" ("code", "created_at", "id", "title") SELECT "code", "created_at", "id", "title" FROM "pools";
DROP TABLE "pools";
ALTER TABLE "new_pools" RENAME TO "pools";
CREATE UNIQUE INDEX "pools_code_key" ON "pools"("code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
