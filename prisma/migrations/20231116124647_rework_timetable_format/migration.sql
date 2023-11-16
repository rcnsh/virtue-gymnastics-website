/*
  Warnings:

  - You are about to drop the column `ageGroupId` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the `AgeGroup` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ageGroup` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_ageGroupId_fkey";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "ageGroupId",
ADD COLUMN     "ageGroup" TEXT NOT NULL;

-- DropTable
DROP TABLE "AgeGroup";
