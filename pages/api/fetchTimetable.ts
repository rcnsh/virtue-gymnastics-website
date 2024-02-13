import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	_req: NextApiRequest,
	res: NextApiResponse,
) {
	const classes = await prisma.class.findMany({
		include: {
			schedules: true,
		},
	});

	const flattenedData = classes.flatMap((classItem) =>
		classItem.schedules.map((schedule) => ({
			...schedule,
			daysOfWeek: schedule.daysOfWeek.map((day) => day + 1),
		})),
	);

	return res.status(200).json(flattenedData);
}
