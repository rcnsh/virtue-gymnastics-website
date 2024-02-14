import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { students, users } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

interface modifiedStudentData extends Omit<students, "student_dob"> {
	student_dob: string;
}

function BookingDetailsPage({
	student_data,
	user_data,
}: { student_data: modifiedStudentData; user_data: users }) {
	const router = useRouter();

	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const deleteStudent = async () => {
		try {
			setLoading(true);
			const result = await fetch(
				`/api/delete/deleteStudent?student_id=${student_data.student_id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			if (result.ok) {
				router.push("/students").catch((error) => {
					console.error("Error navigating to students page:", error);
				});
			}
		} catch (error) {
			console.error("Error deleting student:", error);
		}
	};

	return (
		<>
			<div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center">
				<h2 className="text-lg font-semibold">
					Student Details: {student_data.student_first_name}{" "}
					{student_data.student_last_name}
				</h2>
				<br />
				<div className="grid grid-cols-2 gap-4">
					<div className="mb-4">
						<p className="font-semibold">Parent Information:</p>
						<p>
							Name: {user_data?.first_name} {user_data?.last_name}
						</p>
						<p>Home Phone: {student_data.home_phone || "N/A"}</p>
						<p>Work Phone: {student_data.work_phone || "N/A"}</p>
						<p>Mobile Phone 1: {student_data.mobile_phone1}</p>
						<p>Mobile Phone 2: {student_data.mobile_phone2 || "N/A"}</p>
					</div>
					<div className="mb-4">
						<p className="font-semibold">Student Information:</p>
						<p>
							Name: {student_data.student_first_name}{" "}
							{student_data.student_last_name}
						</p>
						<p>Date of Birth: {student_data.student_dob}</p>
						<p>Gender: {student_data.student_gender}</p>
						<p>
							Medical Conditions:{" "}
							{student_data.student_medical_conditions.join(", ") || "N/A"}
						</p>
						<p>
							Additional Info: {student_data.student_additional_info || "N/A"}
						</p>
						<p>
							Preferred Days:{" "}
							{student_data.student_preferred_days.join(", ") || "N/A"}
						</p>
					</div>
				</div>
				<div>
					<p className="font-semibold">Consents:</p>
					<p>
						Photo Consent: {student_data.student_photo_consent ? "Yes" : "No"}
					</p>
					<p>
						Video Consent: {student_data.student_video_consent ? "Yes" : "No"}
					</p>
					<p>
						Walking Home Consent:{" "}
						{student_data.student_walking_home_consent ? "Yes" : "No"}
					</p>
				</div>
				<div>
					<p className="font-semibold">Contact Information:</p>
					<p>Address 1: {student_data.address1}</p>
					<p>Address 2: {student_data.address2 || "N/A"}</p>
					<p>City: {student_data.city}</p>
					<p>County: {student_data.county}</p>
					<p>Postcode: {student_data.postcode}</p>
					<p>Hear About Us: {student_data.hear_about_us}</p>
				</div>
			</div>
			<br />
			<div className={"flex justify-evenly"}>
				<Link href={"/students"}>
					<Button variant={"default"}>Back</Button>
				</Link>
				<Link href={`/bookings/${student_data.student_id}`}>
					<Button variant={"default"}>View Student&apos;s Bookings</Button>
				</Link>
				<Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
					<DialogTrigger>
						<Button variant={"destructive"}>Deregister Student</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								Are you sure you want to deregister this student?
							</DialogTitle>
							<DialogDescription>
								This will also remove all bookings associated with this student.
							</DialogDescription>
						</DialogHeader>
						<Button
							variant={"destructive"}
							onClick={() => {
								deleteStudent().then(() => {
									setDeleteDialogOpen(false);
								});
							}}
							disabled={loading}
						>
							Deregister
						</Button>
					</DialogContent>
				</Dialog>
			</div>
			<br />
			<br />
			<br />
			<br />
			<br />
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const student_id = context.params?.student_id;
	const { userId } = getAuth(context.req);

	if (!userId) {
		return {
			redirect: {
				destination: "/sign-in",
				permanent: false,
			},
		};
	}
	if (!student_id) {
		return {
			redirect: {
				destination: "/students",
				permanent: false,
			},
		};
	}

	const user_data = await prisma.users.findUnique({
		where: {
			user_id: userId,
		},
	});

	console.log(userId, student_id);
	const student_data = await prisma.students.findUnique({
		where: {
			user_id: userId,
			student_id: parseInt(student_id as string, 10),
		},
	});

	if (!student_data) {
		return {
			redirect: {
				destination: "/students",
				permanent: false,
			},
		};
	}

	const formatted_student_data = {
		...student_data,
		student_dob: student_data.student_dob.toLocaleDateString("en-GB"),
	};

	return {
		props: {
			student_data: formatted_student_data,
			user_data,
		},
	};
};

export default BookingDetailsPage;
