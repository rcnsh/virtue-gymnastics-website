{
	/* imports */
}
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { students } from "@prisma/client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { getAuth } from "@clerk/nextjs/server";
import { GetServerSideProps } from "next";
import prisma from "@/lib/prisma";

{
	/* set up students component */
}
function Students({ students: userStudents }: { students: students[] }) {
	const router = useRouter();
	return (
		<>
			<Head>
				<title>Virtue Movement - Your Students</title>
				<meta name="description" content="Virtue Movement" />
			</Head>
			<SignedIn>
				<br />
				<h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-50 flex justify-center">
					Current Students
				</h1>
				<br />
				<Separator />
				<Button
					variant={"ghost"}
					className={"w-[100%] m-auto"}
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
										<span className="font-semibold">
											Student Date Of Birth:
										</span>{" "}
										{student.student_dob
											? new Date(student.student_dob).toLocaleDateString(
													"en-GB",
											  )
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
			</SignedIn>
			{/* If user isn't signed in, we just tell them to sign in */}
			<SignedOut>
				<div className={"flex justify-center"}>
					<h1 className={"text-2xl text-white "}>
						Please sign in to view your registered students
					</h1>
				</div>
			</SignedOut>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
		</>
	);
}

{
	/* data fetching before rendering component */
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

	const students = await prisma.students.findMany({
		where: {
			user_id: userId,
		},
	});

	{
		/* we cannot return non-serialised data through getServerSideProps, so we will convert it to a string first */
	}

	const studentsWithDateString = students.map((student) => ({
		...student,
		student_dob: student.student_dob.toISOString(),
	}));

	return {
		props: {
			students: studentsWithDateString,
		},
	};
};

export default Students;
