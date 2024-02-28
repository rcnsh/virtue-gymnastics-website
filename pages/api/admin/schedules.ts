import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "GET") {
		try {
			const schedules = await prisma.schedule.findMany();

			res.status(200).json(schedules);
		} catch (error) {
			console.error("Error checking for schedules:", error);
			res.status(500).json({ error: "Error checking for schedules" });
		}
	}
}
