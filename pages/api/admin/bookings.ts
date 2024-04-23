import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import type { bookings } from "@prisma/client";
import { isUserAdmin } from "@/lib/utils";

/**
 * Retrieves bookings from the database if the user is authorized.
 * @param req - The NextApiRequest object.
 * @param res - The NextApiResponse object.
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

			const bookings = (await prisma.$queryRaw`
			SELECT *
			FROM "bookings"
			`) as bookings[];

			res.status(200).json(bookings);
		} catch (error) {
			console.error("Error checking for bookings:", error);
			res.status(500).json({ error: "Error checking for bookings" });
		}
	}
}
