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
import { parseId } from "@/lib/auth/api";
import { requireUser } from "@/lib/auth/pages";
import { type BookingWithStudent, db, type Student } from "@/lib/db";

/**
 * Renders the bookings page for a specific student.
 *
 * @param {Object} props - The component props.
 * @param {BookingWithStudent[]} props.student_id_bookings - The list of bookings for the student.
 * @param {students} props.student_info - The information of the student.
 * @returns {JSX.Element} The rendered component.
 */
function Bookings({
	student_id_bookings,
	student_info,
}: {
	student_id_bookings: BookingWithStudent[];
	student_info: Student;
}) {
	const router = useRouter();
	const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean[]>(
		new Array(student_id_bookings.length).fill(false),
	);

	const refreshData = () => {
		void router.replace(router.asPath);
	};

	async function removeBooking(booking_id: string, index: number) {
		void fetch(`/api/delete/deleteBooking?booking_id=${booking_id}`, {
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
				<title>Virtue Movement - Students</title>
				<meta name="description" content="Virtue Movement" />
			</Head>
			<br />
			<h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-50 flex justify-center">
				{student_info.student_first_name} {student_info.student_last_name}
				&apos;s Bookings
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
				{student_id_bookings ? (
					student_id_bookings.map((booking) => (
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
									open={deleteDialogOpen[student_id_bookings.indexOf(booking)]}
									onOpenChange={(isOpen) => {
										const newDeleteDialogOpen = [...deleteDialogOpen];
										newDeleteDialogOpen[student_id_bookings.indexOf(booking)] =
											isOpen;
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
												void removeBooking(
													booking.booking_id.toString(10),
													student_id_bookings.indexOf(booking),
												);
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
export const getServerSideProps: GetServerSideProps = async (context) => {
	const auth = await requireUser(context);
	if ("redirect" in auth) return auth;

	const studentId = parseId(context.params?.student_id_bookings);
	const student = studentId && (await db.students.find(studentId));
	if (!student || student.user_id !== auth.user.user_id) {
		return { redirect: { destination: "/students", permanent: false } };
	}

	const bookings = await db.bookings.listForUser(auth.user.user_id);

	return {
		props: {
			student_id_bookings: bookings.filter(
				(booking) => booking.student_id === student.student_id,
			),
			student_info: student,
		},
	};
};

export default Bookings;
