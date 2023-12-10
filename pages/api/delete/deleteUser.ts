import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "DELETE") {
		const { user_id } = req.body;

		try {
			const deletedUser = await prisma.users.delete({
				where: {
					user_id: user_id as string,
				},
			});

			res.status(200).json(deletedUser);
		} catch (error) {
			console.error("Error deleting user:", error);
			res.status(500).json({ error: "Error deleting user" });
		}
	} else {
		res.status(405).json({ error: "Method Not Allowed" });
	}
}
