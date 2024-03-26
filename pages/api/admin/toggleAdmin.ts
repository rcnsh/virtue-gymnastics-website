import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { users } from "@prisma/client";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "POST") {
		try {
			const { userId } = getAuth(req);

			if (!userId) {
				return res.status(401).json({ error: "Unauthorized" });
			}

			const currentUser = (await prisma.$queryRaw`
  SELECT *
  FROM "users"
  WHERE "user_id" = ${userId};
`) as users[];

			if (!currentUser[0] || !currentUser[0].admin) {
				return res.status(401).json({ error: "Unauthorised" });
			}

			const { user_id, admin } = req.body;

			const user = (await prisma.$queryRaw`
  SELECT *
  FROM "users"
  WHERE "user_id" = ${user_id};
`) as users[];

			if (!user[0]) {
				return res.status(404).json({ error: "User not found" });
			}

			await prisma.$executeRaw`
  UPDATE "users"
  SET "admin" = ${admin}
  WHERE "user_id" = ${user_id};
`;

			return res
				.status(200)
				.json({ message: "Admin state updated successfully" });
		} catch (error) {
			console.error("Error updating admin state:", error);
			return res.status(500).json({ error: "Error updating admin state" });
		}
	} else {
		return res.status(405).json({ error: "Method Not Allowed" });
	}
}
