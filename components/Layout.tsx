import Footer from "@/components/Footer";
import Titlebar from "@/components/Titlebar";
import { ThemeProvider } from "@/components/themeProvider";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
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
