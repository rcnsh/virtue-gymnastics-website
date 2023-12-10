import { students } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "POST") {
		try {
			const result = await prisma.students.create({
				data: {
					address1: req.body.address1,
					address2: req.body.address2,
					city: req.body.city,
					county: req.body.county,
					postcode: req.body.postcode,
					home_phone: req.body.homePhone,
					work_phone: req.body.workPhone,
					mobile_phone1: req.body.mobilePhone1,
					mobile_phone2: req.body.mobilePhone2,
					hear_about_us: req.body.hearAboutUs,
					student_first_name: req.body.studentFirstName,
					student_last_name: req.body.studentLastName,
					student_dob: req.body.studentDOB,
					student_gender: req.body.studentGender,
					student_medical_conditions: req.body.studentMedicalConditions,
					student_additional_info: req.body.studentAdditionalInfo,
					student_preferred_days: req.body.studentPreferredDays,
					student_photo_consent: req.body.studentPhotoConsent,
					student_video_consent: req.body.studentVideoConsent,
					student_walking_home_consent: req.body.studentWalkingHomeConsent,
					terms_and_conditions: req.body.termsAndConditions,
					privacy_policy: req.body.privacyPolicy,
					marketing_consent: req.body.marketingConsent,
					user_id: req.body.user_id,
				} as students,
			});

			res.status(201).json({
				message: "Student created successfully",
				userID: result.user_id,
			});
		} catch (error) {
			console.error("Error inserting student:", error);
			res.status(500).json({ error: "Error creating student" });
		}
	} else {
		res.status(405).json({ error: "Method not allowed" });
	}
}
