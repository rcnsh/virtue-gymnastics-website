/*
  Warnings:

  - You are about to drop the column `createdAt` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `selectedClass` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `selectedStudent` on the `bookings` table. All the data in the column will be lost.
  - Added the required column `selected_class` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selected_student` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "createdAt",
DROP COLUMN "selectedClass",
DROP COLUMN "selectedStudent",
ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "selected_class" VARCHAR NOT NULL,
ADD COLUMN     "selected_student" VARCHAR NOT NULL;
