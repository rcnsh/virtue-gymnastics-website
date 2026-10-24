import { parseId, route } from "@/lib/auth/api";
import { db } from "@/lib/db";

/**
 * Checks whether one of the user's students is already booked onto a class.
 */
export default route(
	{
		GET: async (req, res, { user }) => {
			const studentId = parseId(req.query.student_id);
			const { selected_class } = req.query;
			if (!studentId || typeof selected_class !== "string") {
				return res.status(400).json({ error: "Missing student or class." });
			}

			const student = await db.students.find(studentId);
			if (!student || (student.user_id !== user.user_id && !user.admin)) {
				return res.status(404).json({ error: "Student not found." });
			}

			return res.status(200).json({
				hasBooking: await db.bookings.exists(studentId, selected_class),
			});
		},
	},
	"user",
);
