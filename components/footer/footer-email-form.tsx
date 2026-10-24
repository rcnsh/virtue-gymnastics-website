import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContactSchema as formSchema } from "@/lib/validation/contact";

export const FooterEmailForm = () => {
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			message: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch("/api/footer-send", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});
			if (response.ok) {
				setSubmitted(true);
				form.reset();
			} else {
				const body = await response.json().catch(() => ({}));
				setError(body.error ?? "Something went wrong, please try again later.");
			}
		} catch (e) {
			console.error(e);
			setError("Something went wrong, please try again later.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="Name"
									id="email-name"
									{...field}
									className={
										"bg-transparent m-1 border-0 underline-footer-form outline-white"
									}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="Email"
									id="email-email"
									{...field}
									className={
										"bg-transparent m-1 border-0 underline-footer-form"
									}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="message"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									placeholder="Message"
									id="email-message"
									{...field}
									className={
										"bg-transparent m-1 border-0 resize-none underline-footer-form"
									}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={loading} id="email-submit">
					{loading ? "Submitting..." : "Submit"}
				</Button>
				{submitted && <p>Thanks, your message was sent!</p>}
				{error && <p className="text-red-400">{error}</p>}
			</form>
		</Form>
	);
};
