import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			{/* initialise clerk with dark mode */}
			<ClerkProvider
				appearance={{
					baseTheme: dark,
				}}
			>
				{/* add a background texture to the entire site */}
				<div className={"backgroundTexture"}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</div>
			</ClerkProvider>
		</>
	);
};

export default App;
export { reportWebVitals } from "next-axiom";
