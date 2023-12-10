import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "GET") {
		try {
			const bookings = await prisma.bookings.findMany();

			res.status(200).json(bookings);
		} catch (error) {
			console.error("Error checking for bookings:", error);
			res.status(500).json({ error: "Error checking for bookings" });
		}
	}
}
