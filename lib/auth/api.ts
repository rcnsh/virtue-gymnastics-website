import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "@/lib/db";
import { getCurrentUser } from "./session";

type Method = "GET" | "POST" | "DELETE";

type Handler<Ctx> = (
	req: NextApiRequest,
	res: NextApiResponse,
	ctx: Ctx,
) => unknown | Promise<unknown>;

type Access = "public" | "user" | "admin";

type Ctx<A extends Access> = A extends "public"
	? { user: User | null }
	: { user: User };

/* Wraps an API route with the checks every route needs: allowed methods,
same-origin for anything that changes data, and who may call it.

	export default route({ POST: handler }, "user");
*/
export function route<A extends Access>(
	handlers: Partial<Record<Method, Handler<Ctx<A>>>>,
	access: A,
) {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		const handler = handlers[req.method as Method];
		if (!handler) {
			res.setHeader("Allow", Object.keys(handlers).join(", "));
			return res.status(405).json({ error: "Method not allowed" });
		}

		// SameSite=Lax already keeps the session cookie off cross-site POSTs;
		// this also rejects them when a browser sends an Origin header.
		if (req.method !== "GET" && !isSameOrigin(req)) {
			return res.status(403).json({ error: "Cross-origin request refused" });
		}

		try {
			const user = await getCurrentUser(req, res);
			if (access !== "public" && !user) {
				return res.status(401).json({ error: "Please sign in" });
			}
			if (access === "admin" && !user?.admin) {
				return res.status(403).json({ error: "Admins only" });
			}
			return await handler(req, res, { user } as Ctx<A>);
		} catch (error) {
			console.error(`${req.method} ${req.url} failed:`, error);
			if (!res.headersSent) {
				res.status(500).json({ error: "Something went wrong" });
			}
		}
	};
}

function isSameOrigin(req: NextApiRequest) {
	const origin = req.headers.origin;
	if (!origin) return true;
	try {
		return new URL(origin).host === req.headers.host;
	} catch {
		return false;
	}
}

/** Parses an integer id from a query string or body value. */
export function parseId(value: unknown): number | null {
	const id = Number(Array.isArray(value) ? value[0] : value);
	return Number.isSafeInteger(id) && id > 0 ? id : null;
}
