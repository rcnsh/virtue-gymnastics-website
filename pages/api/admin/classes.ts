import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import type { Class } from "@prisma/client";
import { isUserAdmin } from "@/lib/utils";

/**
 * Handles the API request for retrieving classes.
 *
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

			const classes = (await prisma.$queryRaw`
			SELECT *
			FROM "Class"
			`) as Class[];

			res.status(200).json(classes);
		} catch (error) {
			console.error("Error checking for classes:", error);
			res.status(500).json({ error: "Error checking for classes" });
		}
	}
}
