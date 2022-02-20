/*
  Warnings:

  - Added the required column `user1Id` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user2Id` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isNewMessage" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "user1Id" TEXT NOT NULL,
ADD COLUMN     "user2Id" TEXT NOT NULL;
