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

import { users } from "@prisma/client";

import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { GetServerSideProps } from "next";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

type Student = {
	user_id: string;
	student_id: string;
	student_first_name: string;
	student_last_name: string;
	mobile_phone_1: string;
	student_dob: Date;
};

const DeletionDropdownMenu = (student: Student) => {
	const router = useRouter();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost">{student.student_id}</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					onClick={() => navigator.clipboard.writeText(student.student_id)}
				>
					Copy Student ID
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => {
						router
							.push(`/admin/bookings/${student.student_id}`)
							.catch((err) => {
								console.error(err);
							});
					}}
				>
					View Student&apos;s Bookings
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() =>
						fetch("/api/delete/deleteStudent", {
							method: "DELETE",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								student_id: student.student_id,
							}),
						})
							.then((res) => res.json())
							.then(router.reload)
					}
				>
					Delete Student
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const columns: ColumnDef<Student>[] = [
	{
		accessorKey: "user_id",
		cell: ({ row }) => {
			const student = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost">{student.user_id}</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(student.user_id)}
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
			const student = row.original;

			return DeletionDropdownMenu(student);
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
		accessorKey: "student_first_name",
		cell: ({ row }) => {
			const student = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost">{student.student_first_name}</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onClick={() =>
								navigator.clipboard.writeText(student.student_first_name)
							}
						>
							Copy Student First Name
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
					Student First Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "student_last_name",
		cell: ({ row }) => {
			const student = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost">{student.student_last_name}</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onClick={() =>
								navigator.clipboard.writeText(student.student_last_name)
							}
						>
							Copy Student Last Name
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
					Student Last Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "student_dob",
		cell: ({ row }) => {
			const student = row.original;
			const studentDOB = new Date(student.student_dob);
			const formattedDOB = studentDOB.toLocaleDateString("en-GB");

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost">{formattedDOB}</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(formattedDOB)}
						>
							Copy Student DOB
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
					Student Date Of Birth
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
];

function StudentsTable<TData, TValue>({
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
			<div className="flex py-4 justify-evenly justify-items-center">
				<Input
					placeholder="Filter Student First Name..."
					value={
						(table
							.getColumn("student_first_name")
							?.getFilterValue() as string) ?? ""
					}
					onChange={(event) =>
						table
							.getColumn("student_first_name")
							?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<Input
					placeholder="Filter Student Last Name..."
					value={
						(table
							.getColumn("student_last_name")
							?.getFilterValue() as string) ?? ""
					}
					onChange={(event) =>
						table
							.getColumn("student_last_name")
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
	students,
	user,
}: {
	students: Student[];
	user: users;
}) {
	return (
		<>
			<Head>
				<title>Students | Admin</title>
			</Head>
			<div className="flex flex-col items-center justify-center space-y-4">
				<br />
				<br />
				<h1 className="text-4xl font-bold">
					{user.first_name} {user.last_name}&apos;s Students
				</h1>
				<StudentsTable columns={columns} data={students} />
				<br />
				<br />
				<br />
				<br />
			</div>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { userId } = getAuth(context.req);
	const user_id_query = context.params?.user_id;

	if (!userId) {
		return {
			redirect: {
				destination: "/sign-in",
				permanent: false,
			},
		};
	}

	const currentUserInfo = await prisma.users.findUnique({
		where: {
			user_id: userId as string,
		},
	});

	if (currentUserInfo?.admin) {
		const students = await prisma.students.findMany({
			where: {
				user_id: user_id_query as string,
			},
		});

		const requestedUserInfo = await prisma.users.findUnique({
			where: {
				user_id: user_id_query as string,
			},
		});

		const studentsWithDateString = students.map((student) => ({
			...student,
			student_dob: student.student_dob.toISOString(),
		}));

		if (!requestedUserInfo || !studentsWithDateString) {
			return {
				redirect: {
					destination: "/",
					permanent: false,
				},
			};
		}

		return {
			props: {
				students: studentsWithDateString,
				user: requestedUserInfo,
			},
		};
	}

	return {
		redirect: {
			destination: "/",
			permanent: false,
		},
	};
};
