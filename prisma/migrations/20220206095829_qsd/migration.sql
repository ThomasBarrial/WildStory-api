/*
  Warnings:

  - You are about to drop the column `name` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `socketId` on the `Conversation` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Conversation_name_key";

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "name",
DROP COLUMN "socketId";
