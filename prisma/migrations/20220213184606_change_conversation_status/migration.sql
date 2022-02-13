-- AlterTable
ALTER TABLE "Conversation" ALTER COLUMN "isNewMessage" DROP DEFAULT,
ALTER COLUMN "isNewMessage" SET DATA TYPE TEXT;
