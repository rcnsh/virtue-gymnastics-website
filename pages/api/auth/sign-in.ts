import { route } from "@/lib/auth/api";
import { getDummyHash, verifyPassword } from "@/lib/auth/password";
import { allowAttempt, clientIp } from "@/lib/auth/rate-limit";
import { SignInSchema } from "@/lib/auth/schemas";
import { createSession } from "@/lib/auth/session";
import { db } from "@/lib/db";

/**
 * Checks an email and password and starts a session.
 */
export default route(
	{
		POST: async (req, res) => {
			const parsed = SignInSchema.safeParse(req.body);
			if (!parsed.success) {
				return res.status(400).json({ error: parsed.error.issues[0].message });
			}
			const { email, password } = parsed.data;

			if (
				!allowAttempt(`sign-in:ip:${clientIp(req)}`, 30) ||
				!allowAttempt(`sign-in:email:${email}`, 10)
			) {
				return res
					.status(429)
					.json({ error: "Too many attempts. Try again in 15 minutes." });
			}

			const account = await db.users.findCredentials(email);
			// Hash even when there's no account so the response time doesn't
			// reveal which emails are registered.
			const valid = await verifyPassword(
				password,
				account?.password_hash ?? (await getDummyHash()),
			);
			if (!account?.password_hash || !valid) {
				return res.status(401).json({ error: "Incorrect email or password." });
			}

			await createSession(res, account.user.user_id);
			return res.status(200).json({ user: account.user });
		},
	},
	"public",
);
