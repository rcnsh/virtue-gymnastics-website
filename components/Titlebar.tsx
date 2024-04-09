import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
	ListItem,
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { useAuth, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import styles from "../styles/Titlebar.module.css";

const listItems: { title: string; href: string; description: string }[] = [
	{
		title: "Home",
		href: "/",
		description: "Virtue's Home Page.",
	},
	{
		title: "Events/Camps",
		href: "/events",
		description: "Events and camps that are happening.",
	},
	{
		title: "FAQS",
		href: "/faqs",
		description: "Frequently asked questions.",
	},
	{
		title: "Parties",
		href: "/parties",
		description: "Book a party or event at Virtue Movement.",
	},
	{
		title: "Member Info",
		href: "/members",
		description: "Become a member of Virtue Movement.",
	},

	{
		title: "External Hire",
		href: "/external-hire",
		description: "Hire Virtue Movement!",
	},
	{
		title: "Socials",
		href: "/socials",
		description: "Learn more about our socials.",
	},
	{
		title: "About Us",
		href: "/about-us",
		description: "Learn more about Virtue Movement.",
	},
];

const listUserItems: { title: string; href: string; description: string }[] = [
	{
		title: "Students",
		href: "/students",
		description: "View all your registered students.",
	},
	{
		title: "Bookings",
		href: "/bookings",
		description: "View all your bookings.",
	},
];

const listAdminItems: { title: string; href: string; description: string }[] = [
	{
		title: "Admin: Users",
		href: "/admin/users",
		description: "View All users on the Site.",
	},
	{
		title: "Admin: Students",
		href: "/admin/students",
		description: "View all students on the site.",
	},
	{
		title: "Admin: Bookings",
		href: "/admin/bookings",
		description: "View all bookings on the site.",
	},
	{
		title: "Admin: Classes",
		href: "/admin/classes",
		description: "View all classes on the site.",
	},
	{
		title: "Admin: Schedules",
		href: "/admin/schedules",
		description: "View all schedules on the site.",
	},
];

const Titlebar = () => {
	const { isSignedIn } = useUser();
	const { userId } = useAuth();
	const [isAdmin, setIsAdmin] = useState(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		async function isUserAdmin() {
			return await fetch(`/api/check/checkIfUserIsAdmin?user_id=${userId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}).then((res) => res.json());
		}
		isUserAdmin().then((res) => {
			setIsAdmin(res.isAdmin);
		});
	}, [isSignedIn, userId]);

	return (
		<section className={styles.titlebar}>
			<div className={styles.title}>
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger className={styles.background}>
								Menu
							</NavigationMenuTrigger>
							<NavigationMenuContent className={styles.navMenu}>
								<ul className="grid w-[200px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[400px]">
									{listItems.map((listItem) => (
										<ListItem
											key={listItem.title}
											title={listItem.title}
											href={listItem.href}
											className={styles.items}
										>
											{listItem.description}
										</ListItem>
									))}
								</ul>

								{isSignedIn && (
									<>
										<Separator />
										<ul className="grid w-[200px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[400px]">
											{listUserItems.map((listItem) => (
												<ListItem
													key={listItem.title}
													title={listItem.title}
													href={listItem.href}
													className={styles.items}
												>
													{listItem.description}
												</ListItem>
											))}
										</ul>
									</>
								)}
								{isAdmin && (
									<>
										<Separator />
										<ul className="grid w-[200px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[400px]">
											{listAdminItems.map((listItem) => (
												<ListItem
													key={listItem.title}
													title={listItem.title}
													href={listItem.href}
													className={styles.items}
												>
													{listItem.description}
												</ListItem>
											))}
										</ul>
									</>
								)}
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
			<div className={styles.logo}>
				<Link href={"/"}>
					<Image
						src={"/virtue-icon.png"}
						alt={"Virtue Icon"}
						width={215}
						height={92}
					/>
				</Link>
			</div>
			{isSignedIn ? (
				<UserButton />
			) : (
				<div>
					<Link href={"/sign-in"}>
						<Button>Login</Button>
					</Link>
					&nbsp; &nbsp; &nbsp; &nbsp;
					<Link href={"/sign-up"}>
						<Button>Sign Up</Button>
					</Link>
				</div>
			)}
		</section>
	);
};

export default Titlebar;
