import { Resend } from "resend";
import { EmailTemplate } from "@/components/footer/footer-email-template";
import { route } from "@/lib/auth/api";
import { allowAttempt, clientIp } from "@/lib/auth/rate-limit";
import { ContactSchema } from "@/lib/validation/contact";

/**
 * Emails a message from the footer contact form to the club, via Resend.
 * Needs RESEND_API_KEY, CONTACT_FROM_EMAIL and CONTACT_TO_EMAIL.
 */
export default route(
	{
		POST: async (req, res) => {
			const { RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL } =
				process.env;
			if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL || !CONTACT_TO_EMAIL) {
				return res
					.status(503)
					.json({ error: "The contact form isn't set up yet." });
			}

			if (!allowAttempt(`contact:${clientIp(req)}`, 5)) {
				return res
					.status(429)
					.json({ error: "Too many messages. Try again later." });
			}

			const parsed = ContactSchema.safeParse(req.body);
			if (!parsed.success) {
				return res.status(400).json({ error: parsed.error.issues[0].message });
			}
			const { name, email, message } = parsed.data;

			const { error } = await new Resend(RESEND_API_KEY).emails.send({
				from: CONTACT_FROM_EMAIL,
				to: CONTACT_TO_EMAIL.split(",").map((to) => to.trim()),
				replyTo: email,
				subject: "New Enquiry from Virtue Website",
				react: EmailTemplate({ Name: name, Email: email, Message: message }),
			});
			if (error) {
				console.error("Resend failed:", error);
				return res.status(502).json({ error: "Couldn't send your message." });
			}

			return res.status(200).json({ ok: true });
		},
	},
	"public",
);
