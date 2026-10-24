import { route } from "@/lib/auth/api";
import { db } from "@/lib/db";

/**
 * Grants or removes admin rights.
 */
export default route(
	{
		POST: async (req, res, { user }) => {
			const { user_id, admin } = req.body ?? {};
			if (typeof user_id !== "string" || typeof admin !== "boolean") {
				return res.status(400).json({ error: "Expected user_id and admin." });
			}
			if (user_id === user.user_id && !admin) {
				return res
					.status(400)
					.json({ error: "You can't remove your own admin rights." });
			}
			if (!(await db.users.find(user_id))) {
				return res.status(404).json({ error: "User not found" });
			}

			await db.users.setAdmin(user_id, admin);
			return res
				.status(200)
				.json({ message: "Admin state updated successfully" });
		},
	},
	"admin",
);
