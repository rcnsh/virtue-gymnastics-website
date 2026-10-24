import { z } from "zod";

/* Shared by the auth forms and the API routes that receive them. */

const email = z
	.string()
	.trim()
	.toLowerCase()
	.pipe(z.email("Enter a valid email address").max(255));

const newPassword = z
	.string()
	.min(10, "Use at least 10 characters")
	.max(200, "Use at most 200 characters");

export const SignUpSchema = z.object({
	first_name: z.string().trim().min(1, "Enter your first name").max(255),
	last_name: z.string().trim().min(1, "Enter your last name").max(255),
	email,
	password: newPassword,
});

export const SignInSchema = z.object({
	email,
	password: z.string().min(1, "Enter your password").max(200),
});

export const ChangePasswordSchema = z.object({
	current_password: z.string().min(1, "Enter your current password").max(200),
	new_password: newPassword,
});
