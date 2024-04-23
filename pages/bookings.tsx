// Imports
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import type { GetServerSideProps } from "next";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import type { students, bookings } from "@prisma/client";

// define the BookingData type for our data
interface BookingData {
	booking_id: number;
	student_id: number;
	user_id: string;
	selected_class: string;
	created_at: string;
	student: students;
}

interface PrismaReturn extends bookings, students {}

// setup Bookings component
/**
 * Renders the Bookings component.
 *
 * @param {Object} props - The component props.
 * @param {BookingData[]} props.bookings - The array of booking data.
 * @returns {JSX.Element} The rendered Bookings component.
 */
function Bookings({ bookings }: { bookings: BookingData[] }) {
	const router = useRouter();
	const refreshData = () => {
		void router.replace(router.asPath);
	};

	const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean[]>(
		new Array(bookings.length).fill(false),
	);

	// remove booking by its id if the user clicks delete

	function removeBooking(booking_id: number, index: number) {
		fetch(`/api/delete/deleteBooking?booking_id=${booking_id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		}).then(async (response) => {
			if (response.ok) {
				refreshData();
				const newDeleteDialogOpen = [...deleteDialogOpen];
				newDeleteDialogOpen[index] = false;
				setDeleteDialogOpen(newDeleteDialogOpen);
			} else {
				console.error("Error removing booking:", response);
			}
		});
	}

	// main html body

	return (
		<>
			<Head>
				<title>Virtue Movement - Your Bookings</title>
				<meta name="description" content="Virtue Movement" />
			</Head>
			<SignedIn>
				<br />
				<h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-50 flex justify-center">
					Current Bookings
				</h1>
				<br />
				<Separator />
				<Button
					variant={"ghost"}
					className={"w-[100%] m-auto"}
					size={"lg"}
					onClick={() => {
						router.push("/bookings/new").catch((error) => {
							console.error("Error navigating to new students page:", error);
						});
					}}
				>
					Add New Booking
				</Button>
				<br />
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 p-8">
					{bookings ? (
						bookings.map((booking, index) => (
							<Card key={booking.booking_id}>
								<CardHeader>
									<CardTitle>
										<p>
											{booking.student.student_first_name}{" "}
											{booking.student.student_last_name}
										</p>
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p>
										<span className="font-semibold">Selected Class: </span>
										{booking.selected_class}
									</p>
									<br />
									<Dialog
										open={deleteDialogOpen[index]}
										onOpenChange={(isOpen) => {
											const newDeleteDialogOpen = [...deleteDialogOpen];
											newDeleteDialogOpen[index] = isOpen;
											setDeleteDialogOpen(newDeleteDialogOpen);
										}}
									>
										<DialogTrigger>
											<Button
												variant={"destructive"}
												className={"w-[100%] m-auto"}
											>
												Remove Class Booking
											</Button>
										</DialogTrigger>
										<DialogContent>
											<DialogHeader>
												<DialogTitle>
													Are you sure you want to delete this booking?
												</DialogTitle>
												<DialogDescription>
													This will remove the student from the class.
												</DialogDescription>
											</DialogHeader>
											<Button
												variant={"destructive"}
												size={"lg"}
												onClick={() => {
													removeBooking(booking.booking_id, index);
												}}
											>
												Remove Class Booking
											</Button>
										</DialogContent>
									</Dialog>
								</CardContent>
							</Card>
						))
					) : (
						<p>No bookings found</p>
					)}
				</div>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
			</SignedIn>
			<SignedOut>
				<div className={"flex justify-center"}>
					<h1 className={"text-2xl text-white "}>
						Please sign in to view your registered students
					</h1>
				</div>
			</SignedOut>
		</>
	);
}

// data fetching

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { userId } = getAuth(context.req);

	if (!userId) {
		return {
			redirect: {
				destination: "/sign-in",
				permanent: false,
			},
		};
	}

	const bookings: PrismaReturn[] = await prisma.$queryRawUnsafe(
		`
		SELECT
		  b.booking_id,
		  b.student_id,
		  b.user_id,
		  b.selected_class,
		  b.created_at,
		  json_build_object(
			'student_id', s.student_id,
			'address1', s.address1,
			'address2', s.address2,
			'city', s.city,
			'county', s.county,
			'postcode', s.postcode,
			'home_phone', s.home_phone,
			'work_phone', s.work_phone,
			'mobile_phone1', s.mobile_phone1,
			'mobile_phone2', s.mobile_phone2,
			'hear_about_us', s.hear_about_us,
			'student_first_name', s.student_first_name,
			'student_last_name', s.student_last_name,
			'student_dob', s.student_dob,
			'student_gender', s.student_gender,
			'student_medical_conditions', s.student_medical_conditions,
			'student_additional_info', s.student_additional_info,
			'student_preferred_days', s.student_preferred_days,
			'student_photo_consent', s.student_photo_consent,
			'student_video_consent', s.student_video_consent,
			'student_walking_home_consent', s.student_walking_home_consent,
			'terms_and_conditions', s.terms_and_conditions,
			'privacy_policy', s.privacy_policy,
			'marketing_consent', s.marketing_consent
		  ) AS student
		FROM "bookings" b
		JOIN "students" s ON b.student_id = s.student_id
		WHERE b.user_id = $1;
	  `,
		userId,
	);

	// we cannot return non-serialised data through getServerSideProps, so we will convert it to a string first

	const bookingsFormattedDate = bookings.map((booking) => ({
		...booking,
		created_at: booking.created_at.toISOString(),
	}));

	return {
		props: {
			bookings: bookingsFormattedDate,
		},
	};
};

export default Bookings;
