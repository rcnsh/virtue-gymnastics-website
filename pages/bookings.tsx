// Imports

import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
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
import { requireUser } from "@/lib/auth/pages";
import { type BookingWithStudent, db } from "@/lib/db";

// setup Bookings component
/**
 * Renders the Bookings component.
 *
 * @param {Object} props - The component props.
 * @param {BookingWithStudent[]} props.bookings - The array of booking data.
 * @returns {JSX.Element} The rendered Bookings component.
 */
function Bookings({ bookings }: { bookings: BookingWithStudent[] }) {
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
			<br />
			<h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-50 flex justify-center">
				Current Bookings
			</h1>
			<br />
			<Separator />
			<Button
				variant={"ghost"}
				className={"w-full m-auto"}
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
									<DialogTrigger asChild>
										<Button variant={"destructive"} className={"w-full m-auto"}>
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
		</>
	);
}

// data fetching

export const getServerSideProps: GetServerSideProps = async (context) => {
	const auth = await requireUser(context);
	if ("redirect" in auth) return auth;

	return {
		props: {
			bookings: await db.bookings.listForUser(auth.user.user_id),
		},
	};
};

export default Bookings;
