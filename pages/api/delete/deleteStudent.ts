import { parseId, route } from "@/lib/auth/api";
import { db } from "@/lib/db";

/**
 * Deletes a student and their bookings. Users can delete their own students;
 * admins can delete any.
 */
export default route(
	{
		DELETE: async (req, res, { user }) => {
			const id = parseId(req.query.student_id);
			const student = id && (await db.students.find(id));
			if (!student || (student.user_id !== user.user_id && !user.admin)) {
				return res.status(404).json({ error: "Student not found." });
			}

			await db.students.delete(student.student_id);
			return res.status(200).json({ message: "Student deleted successfully" });
		},
	},
	"user",
);
