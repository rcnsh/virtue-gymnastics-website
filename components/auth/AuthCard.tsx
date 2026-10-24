import type { ReactNode } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

/**
 * The card the sign-in, sign-up and account forms sit in.
 */
export function AuthCard({
	title,
	children,
	footer,
}: {
	title: string;
	children: ReactNode;
	footer?: ReactNode;
}) {
	return (
		<div className="flex justify-center px-4 py-16">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-center text-3xl">{title}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					{children}
					{footer && (
						<p className="text-center text-sm text-gray-400">{footer}</p>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

/**
 * A labelled text input wired to react-hook-form.
 */
export function TextField<T extends FieldValues>({
	control,
	name,
	label,
	type = "text",
	autoComplete,
}: {
	control: Control<T>;
	name: FieldPath<T>;
	label: string;
	type?: string;
	autoComplete?: string;
}) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input
							type={type}
							autoComplete={autoComplete}
							{...field}
							value={field.value ?? ""}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

export function FormError({ message }: { message: string | null }) {
	if (!message) return null;
	return (
		<p role="alert" className="text-sm text-red-400">
			{message}
		</p>
	);
}
