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
			id: classItem.id,
			title: classItem.name,
			startTime: schedule.startTime,
			endTime: schedule.endTime,
			cost: classItem.cost,
			daysOfWeek: schedule.daysOfWeek.map((day) => day + 1),
			backgroundColor: classItem.backgroundColor,
			age: classItem.ageGroup,
			description: classItem.description,
		})),
	);

	return res.status(200).json(flattenedData);
}
