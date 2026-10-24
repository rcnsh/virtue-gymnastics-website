/** Only allow same-site relative paths, so ?next= can't send people elsewhere. */
export function safeNextPath(next: unknown): string {
	return typeof next === "string" &&
		next.startsWith("/") &&
		!next.startsWith("//") &&
		!next.startsWith("/\\")
		? next
		: "/";
}
