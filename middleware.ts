import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: [
		"/",
		"/timetable",
		"/api/check/checkIfUserIsAdmin",
		"/api/fetchTimetable",
		"/api/clerk/created",
		"/api/clerk",
	],
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
