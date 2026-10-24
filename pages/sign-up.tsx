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
import { SignUpSchema } from "@/lib/auth/schemas";

/**
 * Renders the sign up page.
 */
export default function SignUpPage() {
	const router = useRouter();
	const { refresh } = useAuth();
	const [error, setError] = useState<string | null>(null);
	const next = safeNextPath(router.query.next);

	const form = useForm<z.input<typeof SignUpSchema>>({
		resolver: zodResolver(SignUpSchema),
		defaultValues: { first_name: "", last_name: "", email: "", password: "" },
	});

	async function onSubmit(values: z.input<typeof SignUpSchema>) {
		setError(null);
		try {
			await postJson("/api/auth/sign-up", values);
			await refresh();
			await router.push(next);
		} catch (e) {
			setError((e as Error).message);
		}
	}

	return (
		<>
			<Head>
				<title>Virtue Movement - Sign Up</title>
			</Head>
			<AuthCard
				title="Sign Up"
				footer={
					<>
						Already have an account?{" "}
						<Link
							href={{ pathname: "/sign-in", query: { next } }}
							className="underline"
						>
							Sign in
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
						<div className="grid grid-cols-2 gap-4">
							<TextField
								control={form.control}
								name="first_name"
								label="First name"
								autoComplete="given-name"
							/>
							<TextField
								control={form.control}
								name="last_name"
								label="Last name"
								autoComplete="family-name"
							/>
						</div>
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
							label="Password (at least 10 characters)"
							type="password"
							autoComplete="new-password"
						/>
						<FormError message={error} />
						<Button
							type="submit"
							className="w-full"
							disabled={form.formState.isSubmitting}
						>
							{form.formState.isSubmitting
								? "Creating account..."
								: "Create Account"}
						</Button>
					</form>
				</Form>
			</AuthCard>
		</>
	);
}

export const getServerSideProps = guestOnly;
