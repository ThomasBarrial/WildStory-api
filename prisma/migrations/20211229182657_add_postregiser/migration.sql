/*
  Warnings:

  - You are about to drop the column `name` on the `Topics` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[topicsName]` on the table `Topics` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `topicsName` to the `Topics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Topics" DROP COLUMN "name",
ADD COLUMN     "topicsName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PostRegister" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "PostRegister_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Topics_topicsName_key" ON "Topics"("topicsName");

-- AddForeignKey
ALTER TABLE "PostRegister" ADD CONSTRAINT "PostRegister_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostRegister" ADD CONSTRAINT "PostRegister_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
