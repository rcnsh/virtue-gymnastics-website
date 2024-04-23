import { type ClassValue, clsx } from "clsx";
import { NextApiResponse } from "next";
import { twMerge } from "tailwind-merge";
import prisma from "./prisma";
import type { users } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function isUserAdmin(
	userId: string,
	res: NextApiResponse,
): Promise<void> {
	const user = (await prisma.$queryRaw`
			  SELECT *
			  FROM "users"
			  WHERE "user_id" = ${userId};
			`) as users[];

	if (!user[0] || !user[0].admin) {
		return res.status(401).json({ error: "Unauthorised" });
	}
}
