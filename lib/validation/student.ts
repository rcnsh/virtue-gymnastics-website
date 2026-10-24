import { z } from "zod";
import type { NewStudent } from "@/lib/db";

/* The new student form. Shared by the form and /api/store/storeStudent. */

const phone = z
	.string()
	.trim()
	.regex(
		/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?(-?\s?[0-9])+$/,
		"Invalid Phone Number",
	)
	.max(15, "Phone numbers must be 15 characters or fewer");

const optional = <T extends z.ZodType>(schema: T) =>
	z.union([schema, z.literal("")]).optional();

export const StudentFormSchema = z.object({
	address1: z
		.string()
		.trim()
		.min(1, "Enter the first line of the address")
		.max(255),
	address2: z.string().trim().max(255).optional(),
	city: z.string().trim().min(1, "Enter a city").max(255),
	county: z.string().trim().min(1, "Enter a county").max(255),
	postcode: z
		.string()
		.trim()
		.regex(
			/^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/i,
			"Invalid Postcode",
		)
		.max(8, "Invalid Postcode"),
	homePhone: optional(phone),
	workPhone: optional(phone),
	mobilePhone1: phone,
	mobilePhone2: optional(phone),
	hearAboutUs: z.string().min(1, "Tell us how you heard about us").max(255),
	studentFirstName: z.string().trim().min(1, "Enter a first name").max(255),
	studentLastName: z.string().trim().min(1, "Enter a last name").max(255),
	studentDOB: z.date({ error: "Pick a date of birth" }),
	studentGender: z.enum(["male", "female", "na", "other"], {
		error: "Pick an option",
	}),
	studentMedicalConditions: z.array(z.string().max(255)).max(50).optional(),
	studentAdditionalInfo: z
		.string()
		.max(500, {
			message: "Additional Info must be less than 500 characters.",
		})
		.optional(),
	studentPreferredDays: z.array(z.string().max(20)).max(7).optional(),
	studentPhotoConsent: z.boolean().optional(),
	studentVideoConsent: z.boolean().optional(),
	studentWalkingHomeConsent: z.boolean().optional(),
	termsAndConditions: z.boolean().refine((value) => value, {
		message: "You must accept the terms and conditions",
	}),
	privacyPolicy: z.boolean().refine((value) => value, {
		message: "You must accept the privacy policy",
	}),
	marketingConsent: z.boolean().optional(),
});

export type StudentForm = z.infer<typeof StudentFormSchema>;

/* Over JSON the date arrives as a string. */
export const StudentPayloadSchema = StudentFormSchema.extend({
	studentDOB: z.coerce.date().refine((date) => date < new Date(), {
		message: "Date of birth must be in the past",
	}),
});

export function toNewStudent(
	form: z.infer<typeof StudentPayloadSchema>,
	user_id: string,
): NewStudent {
	return {
		user_id,
		address1: form.address1,
		address2: form.address2 || null,
		city: form.city,
		county: form.county,
		postcode: form.postcode.toUpperCase(),
		home_phone: form.homePhone || null,
		work_phone: form.workPhone || null,
		mobile_phone1: form.mobilePhone1,
		mobile_phone2: form.mobilePhone2 || null,
		hear_about_us: form.hearAboutUs,
		student_first_name: form.studentFirstName,
		student_last_name: form.studentLastName,
		student_dob: form.studentDOB.toISOString(),
		student_gender: form.studentGender,
		student_medical_conditions: form.studentMedicalConditions ?? [],
		student_additional_info: form.studentAdditionalInfo || null,
		student_preferred_days: form.studentPreferredDays ?? [],
		student_photo_consent: !!form.studentPhotoConsent,
		student_video_consent: !!form.studentVideoConsent,
		student_walking_home_consent: !!form.studentWalkingHomeConsent,
		terms_and_conditions: form.termsAndConditions,
		privacy_policy: form.privacyPolicy,
		marketing_consent: !!form.marketingConsent,
	};
}
