import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "GET") {
		const { booking_id } = req.query;

		const id = parseInt(booking_id as string, 10);

		try {
			const students = await prisma.students.findMany({
				where: {
					bookings: {
						some: {
							booking_id: id,
						},
					},
				},
			});
			res.status(200).json(students);
		} catch (error) {
			console.error("Error fetching students:", error);
			res.status(500).json({ error: "Error fetching students" });
		}
	}
}
