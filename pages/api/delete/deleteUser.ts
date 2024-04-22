import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "DELETE") {
		const { user_id } = req.body;

		try {
			await prisma.$executeRaw`DELETE FROM users WHERE user_id = ${user_id}`;

			res.status(200).json({
				message: "User deleted successfully",
			});
		} catch (error) {
			console.error("Error deleting user:", error);
			res.status(500).json({ error: "Error deleting user" });
		}
	} else {
		res.status(405).json({ error: "Method Not Allowed" });
	}
}
