import { route } from "@/lib/auth/api";
import { destroySession } from "@/lib/auth/session";

/**
 * Ends the current session.
 */
export default route(
	{
		POST: async (req, res) => {
			await destroySession(req, res);
			return res.status(204).end();
		},
	},
	"public",
);
