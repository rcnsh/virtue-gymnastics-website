import { route } from "@/lib/auth/api";
import { db } from "@/lib/db";

/**
 * Lists every student.
 */
export default route(
	{ GET: async (_req, res) => res.status(200).json(await db.students.list()) },
	"admin",
);
