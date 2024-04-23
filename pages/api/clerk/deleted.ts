import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

/**
 * Handles the deletion of a user.
 *
 * @param req - The Next.js API request object.
 * @param res - The Next.js API response object.
 */
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "POST") {
		const { data } = req.body;

		try {
			await prisma.$executeRaw`DELETE FROM users WHERE user_id = ${data.id}`;

			res.status(201).json({
				message: "User deleted successfully",
			});
		} catch (error) {
			console.error("Error deleting user:", error);
			res.status(500).json({ error: "Error deleting user" });
		}
	} else {
		res.status(405).json({ error: "Method not allowed" });
	}
}
