/* A small fixed-window limiter for sign-in and sign-up attempts. It lives in
memory, so each server instance counts separately; that's enough to slow down
password guessing on a site this size without another service. */

const WINDOW_MS = 15 * 60 * 1000;
const attempts = new Map<string, { count: number; resetAt: number }>();

/** Records an attempt and returns false once `key` has used up `limit`. */
export function allowAttempt(key: string, limit: number): boolean {
	const now = Date.now();
	if (attempts.size > 10_000) {
		for (const [k, v] of attempts) if (v.resetAt <= now) attempts.delete(k);
	}

	const entry = attempts.get(key);
	if (!entry || entry.resetAt <= now) {
		attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
		return true;
	}
	entry.count += 1;
	return entry.count <= limit;
}

export function clientIp(req: {
	headers: Record<string, string | string[] | undefined>;
	socket?: { remoteAddress?: string };
}): string {
	const forwarded = req.headers["x-forwarded-for"];
	const first = (Array.isArray(forwarded) ? forwarded[0] : forwarded)
		?.split(",")[0]
		?.trim();
	return first || req.socket?.remoteAddress || "unknown";
}
