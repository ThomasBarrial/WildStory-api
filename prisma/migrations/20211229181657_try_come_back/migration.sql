/*
  Warnings:

  - You are about to drop the column `topicsId` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the `PostRegister` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Topics` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PostRegister" DROP CONSTRAINT "PostRegister_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostRegister" DROP CONSTRAINT "PostRegister_userId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_topicsId_fkey";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "topicsId",
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "PostRegister";

-- DropTable
DROP TABLE "Topics";
