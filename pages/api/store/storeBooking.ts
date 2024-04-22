import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "POST") {
		const auth = getAuth(req);
		const userId = auth.userId;

		const studentId = Number.parseInt(req.body.selected_student, 10);
		try {
			await prisma.$executeRaw`INSERT INTO bookings (selected_class, student_id, user_id) VALUES (${req.body.selected_class}, ${studentId}, ${userId})`;

			res.status(201).json({
				message: "Booking created successfully",
			});
		} catch (error) {
			console.error("Error inserting booking:", error);
			res.status(500).json({ error: "Error creating booking" });
		}
	} else {
		res.status(405).json({ error: "Method not allowed" });
	}
}
