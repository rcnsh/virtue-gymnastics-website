import { route } from "@/lib/auth/api";

/**
 * Returns the signed-in user, or null.
 */
export default route(
	{
		GET: (_req, res, { user }) => {
			res.setHeader("Cache-Control", "private, no-store");
			return res.status(200).json({ user });
		},
	},
	"public",
);
