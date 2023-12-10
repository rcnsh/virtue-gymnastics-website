import { ClerkProvider } from "@clerk/nextjs";
// @ts-ignore
import { dark } from "@clerk/themes";
import { AppProps } from "next/app";
import React from "react";
import Layout from "../components/Layout";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<ClerkProvider
				appearance={{
					baseTheme: dark,
				}}
			>
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
