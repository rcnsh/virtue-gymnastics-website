import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "GET") {
		const { student_id, user_id } = req.query;

		const id = parseInt(student_id as string, 10);

		try {
			const students = await prisma.students.findUnique({
				where: {
					student_id: id,
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
