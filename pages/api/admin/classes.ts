import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "GET") {
		try {
			const classes = await prisma.class.findMany();

			res.status(200).json(classes);
		} catch (error) {
			console.error("Error checking for classes:", error);
			res.status(500).json({ error: "Error checking for classes" });
		}
	}
}
