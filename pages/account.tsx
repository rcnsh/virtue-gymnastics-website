import { zodResolver } from "@hookform/resolvers/zod";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { AuthCard, FormError, TextField } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { postJson, useAuth } from "@/lib/auth/client";
import { requireUser } from "@/lib/auth/pages";
import { ChangePasswordSchema } from "@/lib/auth/schemas";
import type { User } from "@/lib/db";

/**
 * Shows the signed-in user's details and lets them change their password.
 */
export default function AccountPage({ user }: { user: User }) {
	const router = useRouter();
	const { signOut } = useAuth();
	const [error, setError] = useState<string | null>(null);
	const [saved, setSaved] = useState(false);

	const form = useForm<z.input<typeof ChangePasswordSchema>>({
		resolver: zodResolver(ChangePasswordSchema),
		defaultValues: { current_password: "", new_password: "" },
	});

	async function onSubmit(values: z.input<typeof ChangePasswordSchema>) {
		setError(null);
		setSaved(false);
		try {
			await postJson("/api/auth/password", values);
			form.reset();
			setSaved(true);
		} catch (e) {
			setError((e as Error).message);
		}
	}

	return (
		<>
			<Head>
				<title>Virtue Movement - Your Account</title>
			</Head>
			<AuthCard title="Your Account">
				<dl className="space-y-1">
					<div>
						<dt className="inline font-semibold">Name: </dt>
						<dd className="inline">
							{user.first_name} {user.last_name}
						</dd>
					</div>
					<div>
						<dt className="inline font-semibold">Email: </dt>
						<dd className="inline">{user.email}</dd>
					</div>
					{user.admin && <p className="text-sm text-gray-400">Admin</p>}
				</dl>
				<Separator />
				<h2 className="text-xl font-semibold">Change password</h2>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4"
						noValidate
					>
						<TextField
							control={form.control}
							name="current_password"
							label="Current password"
							type="password"
							autoComplete="current-password"
						/>
						<TextField
							control={form.control}
							name="new_password"
							label="New password (at least 10 characters)"
							type="password"
							autoComplete="new-password"
						/>
						<FormError message={error} />
						{saved && (
							<p className="text-sm text-green-400">
								Password changed. Your other devices have been signed out.
							</p>
						)}
						<Button
							type="submit"
							className="w-full"
							disabled={form.formState.isSubmitting}
						>
							Change Password
						</Button>
					</form>
				</Form>
				<Separator />
				<Button
					variant="destructive"
					className="w-full"
					onClick={async () => {
						await signOut();
						await router.push("/");
					}}
				>
					Sign Out
				</Button>
			</AuthCard>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const auth = await requireUser(context);
	if ("redirect" in auth) return auth;
	return { props: { user: auth.user } };
};
