-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_student_id_fkey";

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("student_id") ON DELETE CASCADE ON UPDATE NO ACTION;
