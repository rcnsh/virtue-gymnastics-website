/*
  Warnings:

  - The primary key for the `timetable_classes` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "timetable_classes" DROP CONSTRAINT "timetable_classes_pkey",
ADD COLUMN     "number" SERIAL NOT NULL,
ADD CONSTRAINT "timetable_classes_pkey" PRIMARY KEY ("number");
