import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "GET") {
		const { user_id } = req.query;

		try {
			const students = await prisma.students.findMany({
				where: {
					user_id: user_id as string,
				},
			});
			res.status(200).json(students);
		} catch (error) {
			console.error("Error fetching students:", error);
			res.status(500).json({ error: "Error fetching students" });
		}
	}
}
