import { z } from "zod";

export const ContactSchema = z.object({
	name: z.string().trim().min(1, "Enter your name").max(100),
	email: z.email("Enter a valid email address").max(255),
	message: z.string().trim().min(1, "Enter a message").max(5000),
});
