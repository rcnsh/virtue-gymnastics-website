import { route } from "@/lib/auth/api";
import { db } from "@/lib/db";

/**
 * Lists every class schedule.
 */
export default route(
	{ GET: async (_req, res) => res.status(200).json(await db.schedules.list()) },
	"admin",
);
