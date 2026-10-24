// import stuff

import type { GetServerSideProps } from "next";
import Head from "next/head";
import NewStudentForm from "@/components/students/NewStudentForm";
import { requireUser } from "@/lib/auth/pages";

/**
 * Renders the page for creating a new student.
 *
 * @returns The JSX element representing the new student page.
 */
function NewStudentPage() {
	return (
		<>
			<Head>
				<title>Virtue Movement - New Student</title>
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
					<NewStudentForm />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
	const auth = await requireUser(context);
	if ("redirect" in auth) return auth;
	return { props: {} };
};

export default NewStudentPage;
