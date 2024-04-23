import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

/**
 * Deletes a class from the database.
 * @param req - The NextApiRequest object.
 * @param res - The NextApiResponse object.
 */
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "DELETE") {
		const { class_id } = req.query;

		try {
			await prisma.$executeRaw`DELETE FROM Class WHERE id = ${class_id}`;

			res.status(200).json({
				message: "Class deleted successfully",
			});
		} catch (error) {
			console.error("Error deleting booking:", error);
			res.status(500).json({ error: "Error deleting booking" });
		}
	} else {
		res.status(405).json({ error: "Method Not Allowed" });
	}
}
