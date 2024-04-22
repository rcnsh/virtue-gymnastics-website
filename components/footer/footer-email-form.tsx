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
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
	email: z.string().email(),
	name: z.string(),
	message: z.string(),
});

export const FooterEmailForm = () => {
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			message: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		fetch("/api/footer-send", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		})
			.then((r) => {
				if (r.ok) {
					setSubmitted(true);
					form.reset();
				}
			})
			.catch((e) => {
				console.error(e);
				alert("Something went wrong, please try again later.");
			});

		setLoading(false);
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
				<Button type="submit" disabled={loading}>
					{loading ? "Submitting..." : "Submit"}
				</Button>
				{submitted && <p>Thanks, your message was sent!</p>}
			</form>
		</Form>
	);
};
