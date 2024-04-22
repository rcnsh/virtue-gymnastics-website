import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "POST") {
		const { data } = req.body;

		let admin = false;

		if (
			data.email_addresses[0].email_address.endsWith("@virtuemovement.co.uk")
		) {
			admin = true;
		}

		try {
			await prisma.$executeRaw`INSERT INTO users (user_id, first_name, last_name, email, admin) VALUES (${data.id}, ${data.first_name}, ${data.last_name}, ${data.email_addresses[0].email_address}, ${admin})`;

			res.status(201).json({
				message: "User created successfully",
			});
		} catch (error) {
			console.error("Error inserting user:", error);
			res.status(500).json({ error: "Error creating user" });
		}
	} else {
		res.status(405).json({ error: "Method not allowed" });
	}
}
