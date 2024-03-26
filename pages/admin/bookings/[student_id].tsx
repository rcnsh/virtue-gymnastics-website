import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown } from "lucide-react";
import Head from "next/head";
import Router from "next/router";
import { useState } from "react";
import { GetServerSideProps } from "next";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { bookings, students, users } from "@prisma/client";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

interface Bookings extends Omit<bookings, "created_at"> {
	created_at: Date;
}

const columns: ColumnDef<Bookings>[] = [
	{
		accessorKey: "user_id",
		cell: ({ row }) => {
			const booking = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost">{booking.user_id}</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(booking.user_id)}
						>
							Copy User ID
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					User ID
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "student_id",
		cell: ({ row }) => {
			const booking = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost">{booking.student_id}</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onClick={() =>
								navigator.clipboard.writeText(booking.student_id.toString(10))
							}
						>
							Copy Student ID
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Student ID
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "booking_id",
		cell: ({ row }) => {
			const booking = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost">{booking.booking_id}</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onClick={() =>
								navigator.clipboard.writeText(booking.booking_id.toString(10))
							}
						>
							Copy Booking ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() =>
								fetch("/api/delete/deleteBooking", {
									method: "DELETE",
									headers: {
										"Content-Type": "application/json",
									},
									body: JSON.stringify({
										booking_id: booking.booking_id,
									}),
								})
									.then((res) => res.json())
									.then(Router.reload)
							}
						>
							Delete Booking
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Booking ID
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "selected_class",
		cell: ({ row }) => {
			const booking = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost">{booking.selected_class}</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onClick={() =>
								navigator.clipboard.writeText(booking.selected_class)
							}
						>
							Copy Selected Class
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Selected Class
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "created_at",
		cell: ({ row }) => {
			const booking = row.original;
			const date = new Date(booking.created_at);
			const dateFormatted = `${date.toLocaleTimeString(
				"en-GB",
			)} ${date.toLocaleDateString("en-GB")}`;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost">{dateFormatted}</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(dateFormatted)}
						>
							Copy Created At
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Created At
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
];

function BookingsTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters,
		},
	});

	return (
		<div>
			<div className="flex items-center py-4">
				<Input
					placeholder="Filter selected class..."
					value={
						(table.getColumn("selected_class")?.getFilterValue() as string) ??
						""
					}
					onChange={(event) =>
						table
							.getColumn("selected_class")
							?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-center space-x-2 py-4">
				<Button
					variant="outline"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				<Button
					variant="outline"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Next
				</Button>
			</div>
		</div>
	);
}

export default function Users({
	bookings,
	student,
}: {
	bookings: Bookings[];
	student: students;
}) {
	return (
		<>
			<Head>
				<title>Bookings | Admin</title>
			</Head>
			<div className="flex flex-col items-center justify-center space-y-4">
				<br />
				<br />
				<h1 className="text-4xl font-bold">
					{student.student_first_name} {student.student_last_name}'s Bookings
				</h1>
				<BookingsTable columns={columns} data={bookings} />
				<br />
				<br />
				<br />
				<br />
			</div>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const student_id = parseInt(context.params?.student_id as string, 10);
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

	const bookings = (await prisma.$queryRaw`
	SELECT * FROM "bookings" WHERE "user_id" = ${userId} AND "student_id" = ${student_id};
  `) as bookings[];

	const bookingsFormattedDate = bookings.map((booking) => ({
		...booking,
		created_at: booking.created_at.toISOString(),
	}));

	const students = (await prisma.$queryRaw`
	SELECT * FROM "students" WHERE "student_id" = ${student_id};
  `) as students[];

	const currentUser = (await prisma.$queryRaw`
	SELECT * FROM "users" WHERE "user_id" = ${userId};
  `) as users;

	if (
		!bookings ||
		!students[0] ||
		!currentUser ||
		currentUser.admin === false
	) {
		return {
			redirect: {
				destination: "/students",
				permanent: false,
			},
		};
	}

	const studentFormattedDate = {
		...students[0],
		student_dob: students[0].student_dob.toISOString(),
	};

	return {
		props: {
			bookings: bookingsFormattedDate,
			student: studentFormattedDate,
		},
	};
};
