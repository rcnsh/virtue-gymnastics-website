import { route } from "@/lib/auth/api";
import { db } from "@/lib/db";
import { StudentPayloadSchema, toNewStudent } from "@/lib/validation/student";

/**
 * Registers a new student under the signed-in user.
 */
export default route(
	{
		POST: async (req, res, { user }) => {
			const parsed = StudentPayloadSchema.safeParse(req.body);
			if (!parsed.success) {
				return res.status(400).json({ error: parsed.error.issues[0].message });
			}

			const student = await db.students.create(
				toNewStudent(parsed.data, user.user_id),
			);
			return res.status(201).json({ student });
		},
	},
	"user",
);
