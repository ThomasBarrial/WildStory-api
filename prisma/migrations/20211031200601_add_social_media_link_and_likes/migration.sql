/*
  Warnings:

  - Made the column `likes` on table `posts` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `profilTitle` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "likes" SET NOT NULL,
ALTER COLUMN "likes" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "profilTitle" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MediaLink" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "idIcon" TEXT,

    CONSTRAINT "MediaLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaIcon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "iconUrl" TEXT NOT NULL,

    CONSTRAINT "MediaIcon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MediaLinkToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MediaLinkToUser_AB_unique" ON "_MediaLinkToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MediaLinkToUser_B_index" ON "_MediaLinkToUser"("B");

-- AddForeignKey
ALTER TABLE "MediaLink" ADD CONSTRAINT "MediaLink_idIcon_fkey" FOREIGN KEY ("idIcon") REFERENCES "MediaIcon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaLinkToUser" ADD FOREIGN KEY ("A") REFERENCES "MediaLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaLinkToUser" ADD FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
