import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "POST") {
		const { data } = req.body;

		try {
			const newUser = await prisma.users.delete({
				where: {
					user_id: data.id,
				},
			});

			res.status(201).json({
				message: "User deleted successfully",
				user_id: newUser.user_id,
			});
		} catch (error) {
			console.error("Error deleting user:", error);
			res.status(500).json({ error: "Error deleting user" });
		}
	} else {
		res.status(405).json({ error: "Method not allowed" });
	}
}
