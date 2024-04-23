import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import type { Schedule } from "@prisma/client";
import { isUserAdmin } from "@/lib/utils";

/**
 * Retrieves schedules from the database if the request method is GET and the user is authorized.
 * @param req - The NextApiRequest object representing the incoming request.
 * @param res - The NextApiResponse object representing the outgoing response.
 */
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

			isUserAdmin(userId, res);

			const schedules = (await prisma.$queryRaw`
			SELECT *
			FROM "Schedule"
			`) as Schedule[];

			res.status(200).json(schedules);
		} catch (error) {
			console.error("Error checking for schedules:", error);
			res.status(500).json({ error: "Error checking for schedules" });
		}
	}
}
