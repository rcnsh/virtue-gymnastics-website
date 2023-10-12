/*
  Warnings:

  - Made the column `student_dob` on table `students` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "students" ALTER COLUMN "student_dob" SET NOT NULL;
