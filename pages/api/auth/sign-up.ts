import { route } from "@/lib/auth/api";
import { hashPassword } from "@/lib/auth/password";
import { allowAttempt, clientIp } from "@/lib/auth/rate-limit";
import { SignUpSchema } from "@/lib/auth/schemas";
import { createSession } from "@/lib/auth/session";
import { db } from "@/lib/db";

/* Staff get admin rights from their email address, as they did under Clerk.
ADMIN_EMAIL_DOMAINS and ADMIN_EMAILS are comma-separated lists. */
function isAdminEmail(email: string) {
	const list = (value: string | undefined) =>
		(value ?? "")
			.split(",")
			.map((item) => item.trim().toLowerCase())
			.filter(Boolean);

	const domains = list(
		process.env.ADMIN_EMAIL_DOMAINS ?? "virtuemovement.co.uk",
	);
	return (
		list(process.env.ADMIN_EMAILS).includes(email) ||
		domains.some((domain) => email.endsWith(`@${domain}`))
	);
}

/**
 * Creates an account and signs it in.
 */
export default route(
	{
		POST: async (req, res) => {
			if (!allowAttempt(`sign-up:${clientIp(req)}`, 10)) {
				return res
					.status(429)
					.json({ error: "Too many attempts. Try again in 15 minutes." });
			}

			const parsed = SignUpSchema.safeParse(req.body);
			if (!parsed.success) {
				return res.status(400).json({ error: parsed.error.issues[0].message });
			}
			const { password, ...details } = parsed.data;

			if (await db.users.findCredentials(details.email)) {
				return res
					.status(409)
					.json({ error: "An account with that email already exists." });
			}

			const user = await db.users.create({
				...details,
				password_hash: await hashPassword(password),
				admin: isAdminEmail(details.email),
			});
			await createSession(res, user.user_id);

			return res.status(201).json({ user });
		},
	},
	"public",
);
