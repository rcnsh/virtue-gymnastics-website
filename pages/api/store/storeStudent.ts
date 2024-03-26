import { students } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "POST") {
		try {
			await prisma.$executeRaw`INSERT INTO students (
				address1,
				address2,
				city,
				county,
				postcode,
				home_phone,
				work_phone,
				mobile_phone1,
				mobile_phone2,
				hear_about_us,
				student_first_name,
				student_last_name,
				student_dob,
				student_gender,
				student_medical_conditions,
				student_additional_info,
				student_preferred_days,
				student_photo_consent,
				student_video_consent,
				student_walking_home_consent,
				terms_and_conditions,
				privacy_policy,
				marketing_consent,
				user_id
			  ) VALUES (
				${req.body.address1},
				${req.body.address2},
				${req.body.city},
				${req.body.county},
				${req.body.postcode},
				${req.body.homePhone},
				${req.body.workPhone},
				${req.body.mobilePhone1},
				${req.body.mobilePhone2},
				${req.body.hearAboutUs},
				${req.body.studentFirstName},
				${req.body.studentLastName},
				${req.body.studentDOB},
				${req.body.studentGender},
				${req.body.studentMedicalConditions},
				${req.body.studentAdditionalInfo},
				${req.body.studentPreferredDays},
				${req.body.studentPhotoConsent},
				${req.body.studentVideoConsent},
				${req.body.studentWalkingHomeConsent},
				${req.body.termsAndConditions},
				${req.body.privacyPolicy},
				${req.body.marketingConsent},
				${req.body.user_id}
			  )`;

			res.status(201).json({
				message: "Student created successfully",
			});
		} catch (error) {
			console.error("Error inserting student:", error);
			res.status(500).json({ error: "Error creating student" });
		}
	} else {
		res.status(405).json({ error: "Method not allowed" });
	}
}
