/*
  Warnings:

  - You are about to drop the column `members` on the `Conversation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "members",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_ConversationToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ConversationToUser_AB_unique" ON "_ConversationToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ConversationToUser_B_index" ON "_ConversationToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_name_key" ON "Conversation"("name");

-- AddForeignKey
ALTER TABLE "_ConversationToUser" ADD FOREIGN KEY ("A") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConversationToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
