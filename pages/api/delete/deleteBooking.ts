import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

/**
 * Deletes a booking from the database.
 * @param req - The NextApiRequest object.
 * @param res - The NextApiResponse object.
 */
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "DELETE") {
		const { booking_id } = req.query;

		const id = Number.parseInt(booking_id as string, 10);

		try {
			await prisma.$executeRaw`DELETE FROM bookings WHERE booking_id = ${id}`;

			res.status(200).json({
				message: "Booking deleted successfully",
			});
		} catch (error) {
			console.error("Error deleting booking:", error);
			res.status(500).json({ error: "Error deleting booking" });
		}
	} else {
		res.status(405).json({ error: "Method Not Allowed" });
	}
}
