// import stuff
import NewStudentForm from "@/components/students/NewStudentForm";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Head from "next/head";

/**
 * Renders the page for creating a new student.
 *
 * @returns The JSX element representing the new student page.
 */
function NewStudentPage() {
	return (
		<>
			<Head>
				<title>Virtue Movement - Booking</title>
				<meta name="description" content="Virtue Movement" />
			</Head>
			<div className={"m-auto w-max"}>
				<h1
					className={
						"text-6xl font-bold text-white leading-tight flex justify-center"
					}
				>
					New Student Form
				</h1>
				<br />
				<br />
				<div className={"w-[80vw]"}>
					<SignedIn>
						<NewStudentForm />
					</SignedIn>
					<SignedOut>
						<div className={"flex justify-center"}>
							<h1 className={"text-2xl text-white "}>
								Please sign in to register a new Student
							</h1>
						</div>
					</SignedOut>
				</div>
				<br />
				<br />
				<br />
				<br />
				<br />
			</div>
		</>
	);
}

export default NewStudentPage;
