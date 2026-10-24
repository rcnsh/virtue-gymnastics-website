import { route } from "@/lib/auth/api";
import { db } from "@/lib/db";

/**
 * Deletes a user along with their students, bookings and sessions.
 */
export default route(
	{
		DELETE: async (req, res, { user }) => {
			const { user_id } = req.query;
			if (typeof user_id !== "string") {
				return res.status(400).json({ error: "Missing user_id." });
			}
			if (user_id === user.user_id) {
				return res
					.status(400)
					.json({ error: "You can't delete your own account here." });
			}

			await db.users.delete(user_id);
			return res.status(200).json({ message: "User deleted successfully" });
		},
	},
	"admin",
);
