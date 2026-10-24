import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { AuthCard, FormError, TextField } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { postJson, useAuth } from "@/lib/auth/client";
import { safeNextPath } from "@/lib/auth/next-path";
import { guestOnly } from "@/lib/auth/pages";
import { SignInSchema } from "@/lib/auth/schemas";

/**
 * Renders the sign in page.
 */
export default function SignInPage() {
	const router = useRouter();
	const { refresh } = useAuth();
	const [error, setError] = useState<string | null>(null);
	const next = safeNextPath(router.query.next);

	const form = useForm<z.input<typeof SignInSchema>>({
		resolver: zodResolver(SignInSchema),
		defaultValues: { email: "", password: "" },
	});

	async function onSubmit(values: z.input<typeof SignInSchema>) {
		setError(null);
		try {
			await postJson("/api/auth/sign-in", values);
			await refresh();
			await router.push(next);
		} catch (e) {
			setError((e as Error).message);
		}
	}

	return (
		<>
			<Head>
				<title>Virtue Movement - Sign In</title>
			</Head>
			<AuthCard
				title="Sign In"
				footer={
					<>
						No account yet?{" "}
						<Link
							href={{ pathname: "/sign-up", query: { next } }}
							className="underline"
						>
							Sign up
						</Link>
					</>
				}
			>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4"
						noValidate
					>
						<TextField
							control={form.control}
							name="email"
							label="Email"
							type="email"
							autoComplete="email"
						/>
						<TextField
							control={form.control}
							name="password"
							label="Password"
							type="password"
							autoComplete="current-password"
						/>
						<FormError message={error} />
						<Button
							type="submit"
							className="w-full"
							disabled={form.formState.isSubmitting}
						>
							{form.formState.isSubmitting ? "Signing in..." : "Sign In"}
						</Button>
					</form>
				</Form>
			</AuthCard>
		</>
	);
}

export const getServerSideProps = guestOnly;
