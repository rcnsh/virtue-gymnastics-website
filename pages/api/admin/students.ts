import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { users, students } from "@prisma/client";

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

			const user = (await prisma.$queryRaw`
			  SELECT *
			  FROM "users"
			  WHERE "user_id" = ${userId};
			`) as users[];

			if (!user[0] || !user[0].admin) {
				return res.status(401).json({ error: "Unauthorised" });
			}

			const students = (await prisma.$queryRaw`
			SELECT *
			FROM "students"
			`) as students[];

			res.status(200).json(students);
		} catch (error) {
			console.error("Error checking for students:", error);
			res.status(500).json({ error: "Error checking for students" });
		}
	}
}
