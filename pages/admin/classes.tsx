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

import LineBreaks from "@/components/line-breaks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@clerk/nextjs";
import { ArrowUpDown } from "lucide-react";
import Head from "next/head";
import Router from "next/router";
import { useEffect, useState } from "react";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

type Classes = {
	id: string;
	name: string;
	cost: string;
	backgroundColor: string;
	description: string;
	ageGroup: string | null;
};

const columns: ColumnDef<Classes>[] = [
	{
		accessorKey: "id",
		cell: ({ row }) => {
			const classes = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost">{classes.id}</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(classes.id)}
						>
							Copy User ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() =>
								fetch(`/api/delete/deleteClass?class_id=${classes.id}`, {
									method: "DELETE",
									headers: {
										"Content-Type": "application/json",
									},
								})
									.then((res) => res.json())
									.then(Router.reload)
							}
						>
							Delete Class
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
					ID
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "name",
		cell: ({ row }) => {
			const classes = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost">{classes.name}</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(classes.name)}
						>
							Copy Class Name
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
					Class Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "cost",
		cell: ({ row }) => {
			const classes = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost">{classes.cost}</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(classes.cost)}
						>
							Copy Class Cost
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
					Class Cost
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "backgroundColor",
		cell: ({ row }) => {
			const classes = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost">{classes.backgroundColor}</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onClick={() =>
								navigator.clipboard.writeText(classes.backgroundColor)
							}
						>
							Copy Background Colour
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
					Background Colour
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "description",
		cell: ({ row }) => {
			const classes = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost">{classes.description}</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(classes.description)}
						>
							Copy Class Description
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
					Class Description
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "ageGroup",
		cell: ({ row }) => {
			const classes = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost">{classes.ageGroup}</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onClick={() => {
								if (classes.ageGroup) {
									void navigator.clipboard.writeText(classes.ageGroup);
								}
							}}
						>
							Copy Class Age Group
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
					Class Age Group
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
];

async function getData(): Promise<Classes[]> {
	const response = await fetch("/api/admin/classes", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	return await response.json();
}

function ClassesTable<TData, TValue>({
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

export default function Users() {
	const { userId } = useAuth();
	const [loading, setLoading] = useState(true);
	const [isAdmin, setIsAdmin] = useState(false);
	const [data, setData] = useState<Classes[]>([]);

	useEffect(() => {
		const isUserAdmin = fetch(
			`/api/check/checkIfUserIsAdmin?user_id=${userId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			},
		).then((res) => res.json());

		isUserAdmin.then((res) => {
			if (res.isAdmin) {
				setIsAdmin(true);
			}
		});

		getData()
			.then((data) => {
				setData(data);
				setLoading(false);
			})
			.catch((err) => {
				console.error(err);
				setLoading(false);
			});
	}, [userId]);

	if (loading) {
		return <div>Loading...</div>;
	}
	if (!isAdmin) {
		return (
			<div>
				<LineBreaks />
				<h1 className={"text-4xl flex justify-center"}>Unauthorized</h1>
				<LineBreaks />
			</div>
		);
	}
	return (
		<>
			<Head>
				<title>Classes | Admin</title>
			</Head>
			<div className="flex flex-col items-center justify-center space-y-4">
				<br />
				<br />
				<h1 className="text-4xl font-bold">Classes</h1>
				<ClassesTable columns={columns} data={data} />
				<br />
				<br />
				<br />
				<br />
			</div>
		</>
	);
}
