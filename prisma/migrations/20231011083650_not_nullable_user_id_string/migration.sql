/*
  Warnings:

  - Made the column `user_id_string` on table `students` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "students" ALTER COLUMN "user_id_string" SET NOT NULL;
