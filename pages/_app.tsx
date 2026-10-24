import type { AppProps } from "next/app";
import { AuthProvider } from "@/lib/auth/client";
import Layout from "../components/Layout";
import "../styles/globals.css";

/**
 * The main App component that wraps the entire application.
 *
 * @param {AppProps} props - The props for the App component.
 * @returns {JSX.Element} The rendered App component.
 */
const App = ({ Component, pageProps }: AppProps) => {
	return (
		<AuthProvider>
			{/* add a background texture to the entire site */}
			<div className={"backgroundTexture"}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</div>
		</AuthProvider>
	);
};

export default App;
