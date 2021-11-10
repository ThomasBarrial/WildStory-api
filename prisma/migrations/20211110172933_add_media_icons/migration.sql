/*
  Warnings:

  - You are about to drop the column `idIcon` on the `MediaLink` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MediaLink" DROP CONSTRAINT "MediaLink_idIcon_fkey";

-- AlterTable
ALTER TABLE "MediaLink" DROP COLUMN "idIcon",
ADD COLUMN     "iconId" TEXT;

-- AddForeignKey
ALTER TABLE "MediaLink" ADD CONSTRAINT "MediaLink_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "MediaIcon"("id") ON DELETE SET NULL ON UPDATE CASCADE;
