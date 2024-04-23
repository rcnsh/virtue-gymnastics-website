import { SignIn } from "@clerk/nextjs";

/* custom sign up page */

/**
 * Renders the Sign In page.
 * @returns JSX element representing the Sign In page.
 */
const LoginPage = () => {
	return (
		<>
			<br />
			<br />
			<div className={"flex justify-center"}>
				<h1 className={"text-5xl"}>Sign In</h1>
			</div>
			<br />
			<div className={"flex justify-center"}>
				<SignIn />
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

export default LoginPage;
