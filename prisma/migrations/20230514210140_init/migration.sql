-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "budget" INTEGER DEFAULT 0,
    "income" INTEGER DEFAULT 0,
    "spend" INTEGER DEFAULT 0,
    "isVerified" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("budget", "createAt", "email", "id", "income", "isVerified", "name", "spend", "updateAt") SELECT "budget", "createAt", "email", "id", "income", "isVerified", "name", "spend", "updateAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
