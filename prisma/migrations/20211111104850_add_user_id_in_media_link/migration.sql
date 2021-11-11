/*
  Warnings:

  - You are about to drop the `_MediaLinkToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `MediaLink` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_MediaLinkToUser" DROP CONSTRAINT "_MediaLinkToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_MediaLinkToUser" DROP CONSTRAINT "_MediaLinkToUser_B_fkey";

-- AlterTable
ALTER TABLE "MediaLink" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_MediaLinkToUser";

-- AddForeignKey
ALTER TABLE "MediaLink" ADD CONSTRAINT "MediaLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
