import { route } from "@/lib/auth/api";
import { db } from "@/lib/db";

/**
 * Lists every user.
 */
export default route(
	{ GET: async (_req, res) => res.status(200).json(await db.users.list()) },
	"admin",
);
