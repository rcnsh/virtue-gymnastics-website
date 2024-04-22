import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: [
		"/",
		"/timetable",
		"/api/check/checkIfUserIsAdmin",
		"/api/fetchTimetable",
		"/api/clerk/created",
		"/api/clerk/updated",
		"/api/clerk/deleted",
		"/sign-in",
		"/sign-up",
		"/api/footer-send",
		"/_axiom/web-vitals",
	],
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
