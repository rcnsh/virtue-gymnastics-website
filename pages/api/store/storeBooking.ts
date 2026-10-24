import { parseId, route } from "@/lib/auth/api";
import { db } from "@/lib/db";

/**
 * Books one of the signed-in user's students onto a class.
 */
export default route(
	{
		POST: async (req, res, { user }) => {
			const studentId = parseId(req.body?.selected_student);
			const classId = req.body?.selected_class;
			if (!studentId || typeof classId !== "string") {
				return res.status(400).json({ error: "Choose a class and a student." });
			}

			const student = await db.students.find(studentId);
			if (!student || student.user_id !== user.user_id) {
				return res.status(404).json({ error: "Student not found." });
			}
			if (!(await db.classes.find(classId))) {
				return res.status(404).json({ error: "Class not found." });
			}
			if (await db.bookings.exists(studentId, classId)) {
				return res
					.status(409)
					.json({ error: "This student is already booked for this class." });
			}

			await db.bookings.create({
				student_id: studentId,
				user_id: user.user_id,
				selected_class: classId,
			});
			return res.status(201).json({ message: "Booking created successfully" });
		},
	},
	"user",
);
