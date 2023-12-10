import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "GET") {
		const { user_id, student_id } = req.query;

		const student_id_number = parseInt(student_id as string, 10);

		try {
			const bookings = await prisma.bookings.findMany({
				where: {
					user_id: user_id as string,
					student_id: student_id_number,
				},
				include: {
					student: true,
				},
			});
			res.status(200).json(bookings);
		} catch (error) {
			console.error("Error fetching bookings:", error);
			res.status(500).json({ error: "Error fetching bookings" });
		}
	}
}
