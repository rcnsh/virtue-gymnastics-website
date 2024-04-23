import { EmailTemplate } from "@/components/footer/footer-email-template";
import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Handles the API request for sending a footer message.
 * @param req - The NextApiRequest object.
 * @param res - The NextApiResponse object.
 */
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { name, email, message } = req.body;

	try {
		const data = await resend.emails.send({
			from: "Virtue Website Enquiry <onboarding@resend.dev>",
			text: "Virtue Email",
			to: ["jacobjameswiltshire@protonmail.com"],
			subject: "New Enquiry from Virtue Website",
			react: EmailTemplate({
				Name: name,
				Email: email,
				Message: message,
			}),
		});

		res.status(200).json(data);
	} catch (error) {
		res.status(400).json(error);
	}
}
