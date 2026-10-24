import { route } from "@/lib/auth/api";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { ChangePasswordSchema } from "@/lib/auth/schemas";
import { createSession, destroyAllSessions } from "@/lib/auth/session";
import { db } from "@/lib/db";

/**
 * Changes the signed-in user's password and signs out their other sessions.
 */
export default route(
	{
		POST: async (req, res, { user }) => {
			const parsed = ChangePasswordSchema.safeParse(req.body);
			if (!parsed.success) {
				return res.status(400).json({ error: parsed.error.issues[0].message });
			}
			const { current_password, new_password } = parsed.data;

			const account = await db.users.findCredentials(user.email);
			if (
				!account?.password_hash ||
				!(await verifyPassword(current_password, account.password_hash))
			) {
				return res
					.status(400)
					.json({ error: "Your current password is incorrect." });
			}

			await db.users.setPasswordHash(
				user.user_id,
				await hashPassword(new_password),
			);
			await destroyAllSessions(res, user.user_id);
			await createSession(res, user.user_id);

			return res.status(200).json({ ok: true });
		},
	},
	"user",
);
