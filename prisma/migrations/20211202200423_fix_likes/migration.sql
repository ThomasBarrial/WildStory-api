/*
  Warnings:

  - You are about to drop the column `enabled` on the `Likes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Likes" DROP COLUMN "enabled",
ADD COLUMN     "enable" BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
