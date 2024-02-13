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
import { GetServerSideProps } from "next";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import type { students } from "@prisma/client";

interface BookingData {
	booking_id: number;
	student_id: number;
	user_id: string;
	selected_class: string;
	created_at: string;
	student: students;
}

function Bookings({ bookings }: { bookings: BookingData[] }) {
	const router = useRouter();
	const refreshData = () => {
		void router.replace(router.asPath);
	};

	const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean[]>(
		new Array(bookings.length).fill(false),
	);

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

export const getServerSideProps: GetServerSideProps = async (context) => {
	const auth = getAuth(context.req);

	const userId = auth.userId;
	if (!userId) {
		return {
			redirect: {
				destination: "/sign-in",
				permanent: false,
			},
		};
	}

	const bookings = await prisma.bookings.findMany({
		where: {
			user_id: userId,
		},
		include: {
			student: true,
		},
	});

	const bookingsFormattedDate = bookings.map((booking) => ({
		...booking,
		created_at: booking.created_at.toISOString(),
		student: {
			...booking.student,
			student_dob: booking.student.student_dob.toISOString(),
		},
	}));

	return {
		props: {
			bookings: bookingsFormattedDate,
		},
	};
};

export default Bookings;
