import { route } from "@/lib/auth/api";
import { db } from "@/lib/db";

/**
 * Lists every class.
 */
export default route(
	{
		GET: async (_req, res) =>
			res
				.status(200)
				.json((await db.classes.list()).map(({ schedules, ...c }) => c)),
	},
	"admin",
);
