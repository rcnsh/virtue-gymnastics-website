import Footer from "@/components/Footer";
import Titlebar from "@/components/Titlebar";
import { ThemeProvider } from "@/components/themeProvider";
import { Separator } from "@/components/ui/separator";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

/* define our layout with framer motion elements to make the pages fade in */

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			{/* speedinsights to see how page speed does */}
			<SpeedInsights />
			<motion.main
				className={"w-[100vw] min-h-[100dvh]"}
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: 1,
				}}
				transition={{
					duration: 1,
					ease: "easeInOut",
				}}
			>
				<br />
				<Titlebar />
				<br />
				<br />
				<Separator />
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
				<Footer />
			</motion.main>
		</>
	);
};

export default Layout;
