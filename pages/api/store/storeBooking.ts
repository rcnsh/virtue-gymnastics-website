import { bookings } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "POST") {
		const auth = getAuth(req);
		const userId = auth.userId;

		const studentId = parseInt(req.body.selected_student, 10);
		try {
			const result = await prisma.bookings.create({
				data: {
					selected_class: req.body.selected_class,
					student_id: studentId,
					user_id: userId,
				} as bookings,
			});

			res.status(201).json({
				message: "Booking created successfully",
				bookingID: result.booking_id,
			});
		} catch (error) {
			console.error("Error inserting booking:", error);
			res.status(500).json({ error: "Error creating booking" });
		}
	} else {
		res.status(405).json({ error: "Method not allowed" });
	}
}
