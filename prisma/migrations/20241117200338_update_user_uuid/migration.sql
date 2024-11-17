/*
  Warnings:

  - Made the column `userId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Ship" DROP CONSTRAINT "Ship_userId_fkey";

-- AlterTable
ALTER TABLE "Ship" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Ship" ADD CONSTRAINT "Ship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
