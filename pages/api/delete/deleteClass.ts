import { route } from "@/lib/auth/api";
import { db } from "@/lib/db";

/**
 * Deletes a class and its schedules.
 */
export default route(
	{
		DELETE: async (req, res) => {
			const { class_id } = req.query;
			if (typeof class_id !== "string") {
				return res.status(400).json({ error: "Missing class_id." });
			}

			await db.classes.delete(class_id);
			return res.status(200).json({ message: "Class deleted successfully" });
		},
	},
	"admin",
);
