import { type ClassValue, clsx } from "clsx";
import { NextApiResponse } from "next";
import { twMerge } from "tailwind-merge";
import prisma from "./prisma";
import type { users } from "@prisma/client";

/**
 * Combines multiple class names into a single string.
 * @param inputs - The class names to be combined.
 * @returns The combined class names as a string.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Checks if a user is an admin.
 * @param userId - The ID of the user to check.
 * @param res - The response object to send the result to.
 * @returns A Promise that resolves to void.
 */
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
