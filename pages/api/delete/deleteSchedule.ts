import { parseId, route } from "@/lib/auth/api";
import { db } from "@/lib/db";

/**
 * Deletes one time slot from a class's schedule.
 */
export default route(
	{
		DELETE: async (req, res) => {
			const id = parseId(req.query.schedule_id);
			if (!id) {
				return res.status(400).json({ error: "Missing schedule_id." });
			}

			await db.schedules.delete(id);
			return res.status(200).json({ message: "Schedule deleted successfully" });
		},
	},
	"admin",
);
