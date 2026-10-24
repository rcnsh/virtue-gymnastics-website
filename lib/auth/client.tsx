import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import type { User } from "@/lib/db/types";

/* Who's signed in, for components that render on the client (the title bar,
the sign-in forms). Pages that need a user check on the server instead, with
requireUser / requireAdmin from lib/auth/pages. */

type AuthState = {
	user: User | null;
	loading: boolean;
	/** Re-reads the session, e.g. after signing in. */
	refresh: () => Promise<void>;
	signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	const refresh = useCallback(async () => {
		try {
			const response = await fetch("/api/auth/me");
			const body = response.ok ? await response.json() : { user: null };
			setUser(body.user);
		} catch {
			setUser(null);
		} finally {
			setLoading(false);
		}
	}, []);

	const signOut = useCallback(async () => {
		await fetch("/api/auth/sign-out", { method: "POST" });
		setUser(null);
	}, []);

	useEffect(() => {
		void refresh();
	}, [refresh]);

	const value = useMemo(
		() => ({ user, loading, refresh, signOut }),
		[user, loading, refresh, signOut],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
	return context;
}

/** POSTs JSON and returns the parsed body, throwing the API's error message. */
export async function postJson<T = unknown>(
	url: string,
	body: unknown,
): Promise<T> {
	const response = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});
	const data = await response.json().catch(() => ({}));
	if (!response.ok) {
		throw new Error(data.error ?? "Something went wrong, please try again.");
	}
	return data as T;
}
