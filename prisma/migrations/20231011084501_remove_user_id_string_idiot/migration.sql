/*
  Warnings:

  - You are about to drop the column `user_id_string` on the `students` table. All the data in the column will be lost.
  - Made the column `user_id` on table `students` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "students" DROP COLUMN "user_id_string",
ALTER COLUMN "user_id" SET NOT NULL;
