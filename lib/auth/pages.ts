import type {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	Redirect,
} from "next";
import type { User } from "@/lib/db";
import { getCurrentUser } from "./session";

/* Guards for getServerSideProps. Each returns either the user or a redirect:

	const auth = await requireUser(context);
	if ("redirect" in auth) return auth;
	const { user } = auth;
*/

const signInRedirect = (context: GetServerSidePropsContext) => ({
	redirect: {
		destination: `/sign-in?next=${encodeURIComponent(context.resolvedUrl)}`,
		permanent: false,
	} satisfies Redirect,
});

export async function requireUser(
	context: GetServerSidePropsContext,
): Promise<{ user: User } | { redirect: Redirect }> {
	const user = await getCurrentUser(context.req, context.res);
	return user ? { user } : signInRedirect(context);
}

export async function requireAdmin(
	context: GetServerSidePropsContext,
): Promise<{ user: User } | { redirect: Redirect }> {
	const user = await getCurrentUser(context.req, context.res);
	if (!user) return signInRedirect(context);
	if (!user.admin) {
		return { redirect: { destination: "/", permanent: false } };
	}
	return { user };
}

/** For admin pages that load their data on the client. */
export async function adminOnly(
	context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Record<string, never>>> {
	const auth = await requireAdmin(context);
	return "redirect" in auth ? auth : { props: {} };
}

/** For the sign-in and sign-up pages: skip them if already signed in. */
export async function guestOnly(
	context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Record<string, never>>> {
	const user = await getCurrentUser(context.req, context.res);
	return user
		? { redirect: { destination: "/", permanent: false } }
		: { props: {} };
}
