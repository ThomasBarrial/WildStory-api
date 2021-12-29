/*
  Warnings:

  - Added the required column `topicsId` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "topicsId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Topics" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Topics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_topicsId_fkey" FOREIGN KEY ("topicsId") REFERENCES "Topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
