import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import type { students } from "@prisma/client";
import { isUserAdmin } from "@/lib/utils";

/**
 * Retrieves a list of students associated with a specific user.
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

			const { user_id } = req.query;

			const students = (await prisma.$queryRaw`
			SELECT *
			FROM "students"
			WHERE "user_id" = ${user_id}
			`) as students[];

			res.status(200).json(students);
		} catch (error) {
			console.error("Error finding student:", error);
			res.status(500).json({ error: "Error finding student" });
		}
	}
}
