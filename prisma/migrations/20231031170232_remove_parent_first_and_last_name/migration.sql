/*
  Warnings:

  - You are about to drop the column `parent_first_name` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `parent_last_name` on the `students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "students" DROP COLUMN "parent_first_name",
DROP COLUMN "parent_last_name";
