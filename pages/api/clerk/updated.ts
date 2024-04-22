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
			await prisma.$executeRaw`UPDATE users 
	SET 
		first_name = ${data.first_name},
		last_name = ${data.last_name},
		email = ${data.email_addresses[0].email_address},
		admin = ${admin}
	WHERE 
		user_id = ${data.id}`;

			res.status(201).json({
				message: "User updated successfully",
			});
		} catch (error) {
			console.error("Error updating user:", error);
			res.status(500).json({ error: "Error updating user" });
		}
	} else {
		res.status(405).json({ error: "Method not allowed" });
	}
}
