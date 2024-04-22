import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import type { bookings } from "@prisma/client";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "GET") {
		const { student_id, selected_class } = req.query;

		const student_id_number = Number.parseInt(student_id as string, 10);
		try {
			const existingBooking = (await prisma.$queryRaw`
			  SELECT *
			  FROM "bookings"
			  WHERE "student_id" = ${student_id_number}
				AND "selected_class" = ${selected_class}
			  ORDER BY "booking_id"
			  LIMIT 1;
			`) as bookings[];

			res.status(200).json({ hasBooking: !!existingBooking[0] });
		} catch (error) {
			console.error("Error checking for existing booking:", error);
			res.status(500).json({ error: "Error checking for existing booking" });
		}
	}
}
