import { createHash, randomBytes } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import { db, type User } from "@/lib/db";

/* Database-backed sessions. The browser holds a random token in an HttpOnly
cookie; the store only keeps its SHA-256, so reading the sessions table isn't
enough to sign in as someone. Sessions last 30 days and are pushed back out
to 30 days whenever they're used with less than 15 left. */

const SESSION_DAYS = 30;
const RENEW_WHEN_DAYS_LEFT = 15;
const DAY_MS = 24 * 60 * 60 * 1000;

const secure = process.env.NODE_ENV === "production";
// The __Host- prefix makes the browser refuse the cookie unless it's Secure,
// host-only and path=/, which only works over HTTPS.
export const SESSION_COOKIE = secure ? "__Host-session" : "session";

type Req = IncomingMessage & { cookies?: Partial<Record<string, string>> };

const hashToken = (token: string) =>
	createHash("sha256").update(token).digest("hex");

function setSessionCookie(res: ServerResponse, token: string, expires: Date) {
	const parts = [
		`${SESSION_COOKIE}=${token}`,
		"Path=/",
		"HttpOnly",
		"SameSite=Lax",
		`Expires=${expires.toUTCString()}`,
	];
	if (secure) parts.push("Secure");
	appendSetCookie(res, parts.join("; "));
}

function clearSessionCookie(res: ServerResponse) {
	const parts = [
		`${SESSION_COOKIE}=`,
		"Path=/",
		"HttpOnly",
		"SameSite=Lax",
		"Max-Age=0",
	];
	if (secure) parts.push("Secure");
	appendSetCookie(res, parts.join("; "));
}

function appendSetCookie(res: ServerResponse, cookie: string) {
	const existing = res.getHeader("Set-Cookie");
	const list = Array.isArray(existing)
		? existing
		: existing
			? [String(existing)]
			: [];
	res.setHeader("Set-Cookie", [...list, cookie]);
}

export async function createSession(res: ServerResponse, userId: string) {
	const token = randomBytes(32).toString("base64url");
	const expires = new Date(Date.now() + SESSION_DAYS * DAY_MS);
	await db.sessions.create({
		id: hashToken(token),
		user_id: userId,
		expires_at: expires.toISOString(),
	});
	setSessionCookie(res, token, expires);
}

/** The signed-in user, or null. Renews the session cookie when it's due. */
export async function getCurrentUser(
	req: Req,
	res: ServerResponse,
): Promise<User | null> {
	const token = req.cookies?.[SESSION_COOKIE];
	if (!token) return null;

	const id = hashToken(token);
	const session = await db.sessions.find(id);
	if (!session) {
		clearSessionCookie(res);
		return null;
	}

	const expiresAt = new Date(session.expires_at).getTime();
	if (expiresAt <= Date.now()) {
		await db.sessions.delete(id);
		clearSessionCookie(res);
		return null;
	}

	const user = await db.users.find(session.user_id);
	if (!user) {
		clearSessionCookie(res);
		return null;
	}

	if (expiresAt - Date.now() < RENEW_WHEN_DAYS_LEFT * DAY_MS) {
		const expires = new Date(Date.now() + SESSION_DAYS * DAY_MS);
		await db.sessions.extend(id, expires.toISOString());
		setSessionCookie(res, token, expires);
	}

	return user;
}

export async function destroySession(req: Req, res: ServerResponse) {
	const token = req.cookies?.[SESSION_COOKIE];
	if (token) await db.sessions.delete(hashToken(token));
	clearSessionCookie(res);
}

/** Signs the user out everywhere, e.g. after a password change. */
export async function destroyAllSessions(res: ServerResponse, userId: string) {
	await db.sessions.deleteForUser(userId);
	clearSessionCookie(res);
}
