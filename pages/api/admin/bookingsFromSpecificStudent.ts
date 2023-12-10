import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "GET") {
		try {
			const { student_id } = req.query;

			const student_id_number = parseInt(student_id as string);

			const bookings = await prisma.bookings.findMany({
				where: {
					student_id: student_id_number,
				},
			});

			res.status(200).json(bookings);
		} catch (error) {
			console.error("Error checking for bookings:", error);
			res.status(500).json({ error: "Error checking for bookings" });
		}
	}
}
