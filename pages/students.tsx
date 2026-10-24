/* imports */

import type { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { requireUser } from "@/lib/auth/pages";
import { db, type Student } from "@/lib/db";

/**
 * Renders a page displaying the current students.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.students - An array of student objects.
 * @returns {JSX.Element} The rendered Students component.
 */
function Students({ students: userStudents }: { students: Student[] }) {
	const router = useRouter();
	return (
		<>
			<Head>
				<title>Virtue Movement - Your Students</title>
				<meta name="description" content="Virtue Movement" />
			</Head>
			<br />
			<h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-50 flex justify-center">
				Current Students
			</h1>
			<br />
			<Separator />
			<Button
				variant={"ghost"}
				className={"w-full m-auto"}
				size={"lg"}
				onClick={() => {
					router.push("/students/new").catch((error) => {
						console.error("Error navigating to new students page:", error);
					});
				}}
			>
				Add New Student
			</Button>
			<br />
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-8 h-[25vh]">
				{userStudents.map((student) => (
					<Link
						href={`/students/${student.student_id}`}
						key={student.student_id}
					>
						<Card>
							<CardHeader>
								<CardTitle>
									<p>
										{student.student_first_name} {student.student_last_name}
									</p>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p>
									<span className="font-semibold">Student First Name:</span>{" "}
									{student.student_first_name}
								</p>
								<p>
									<span className="font-semibold">Student Last Name:</span>{" "}
									{student.student_last_name}
								</p>
								<p>
									<span className="font-semibold">Student Date Of Birth:</span>{" "}
									{student.student_dob
										? new Date(student.student_dob).toLocaleDateString("en-GB")
										: "N/A"}
								</p>
								<p>
									<span className="font-semibold">Address:</span>{" "}
									{student.address1} {student.address2}, {student.city},{" "}
									{student.county}, {student.postcode}
								</p>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
		</>
	);
}

/* data fetching before rendering component */

export const getServerSideProps: GetServerSideProps = async (context) => {
	const auth = await requireUser(context);
	if ("redirect" in auth) return auth;

	return {
		props: {
			students: await db.students.listForUser(auth.user.user_id),
		},
	};
};

export default Students;
