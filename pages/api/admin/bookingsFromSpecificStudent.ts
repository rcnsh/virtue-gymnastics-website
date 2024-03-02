import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "GET") {
		try {
			const { userId } = getAuth(req);

			if (!userId) {
				return res.status(401).json({ error: "Unauthorized" });
			}

			const user = await prisma.users.findUnique({
				where: { user_id: userId },
			});

			if (!user || !user.admin) {
				return res.status(401).json({ error: "Unauthorised" });
			}

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
