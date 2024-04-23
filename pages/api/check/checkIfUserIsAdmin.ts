import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import type { users } from "@prisma/client";

/**
 * Checks if a user is an admin.
 * @param req - The NextApiRequest object.
 * @param res - The NextApiResponse object.
 */
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "GET") {
		const { user_id } = req.query;

		try {
			const user = (await prisma.$queryRaw`
			  SELECT *
			  FROM "users"
			  WHERE "user_id" = ${user_id};
			`) as users[];

			res.status(200).json({ isAdmin: !!user[0]?.admin });
		} catch (error) {
			console.error("Error checking user:", error);
			res.status(500).json({ error: "Error checking user" });
		}
	}
}
