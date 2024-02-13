import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "DELETE") {
		const { class_id } = req.query;

		try {
			const deletedClass = await prisma.class.delete({
				where: {
					id: class_id as string,
				},
			});

			res.status(200).json(deletedClass);
		} catch (error) {
			console.error("Error deleting booking:", error);
			res.status(500).json({ error: "Error deleting booking" });
		}
	} else {
		res.status(405).json({ error: "Method Not Allowed" });
	}
}
