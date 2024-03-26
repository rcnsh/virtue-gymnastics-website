import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "DELETE") {
		const { student_id } = req.query;

		const id = parseInt(student_id as string, 10);

		try {
			await prisma.$executeRaw`DELETE FROM students WHERE student_id = ${id}`;

			res.status(200).json({
				message: "Student deleted successfully",
			});
		} catch (error) {
			console.error("Error deleting student:", error);
			res.status(500).json({ error: "Error deleting student" });
		}
	} else {
		res.status(405).json({ error: "Method Not Allowed" });
	}
}
