import { SignUp } from "@clerk/nextjs";

/* custom sign in page */

/**
 * Renders the Sign Up page.
 * @returns JSX element representing the Sign Up page.
 */
const SignUpPage = () => {
	return (
		<>
			<br />
			<br />
			<div className={"flex justify-center"}>
				<h1 className={"text-5xl"}>Sign Up</h1>
			</div>
			<br />
			<div className={"flex justify-center"}>
				<SignUp />
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
};

export default SignUpPage;
