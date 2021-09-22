/*
  Warnings:

  - You are about to drop the column `name` on the `formations` table. All the data in the column will be lost.
  - Added the required column `formationName` to the `formations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "formations" DROP COLUMN "name",
ADD COLUMN     "formationName" TEXT NOT NULL;
