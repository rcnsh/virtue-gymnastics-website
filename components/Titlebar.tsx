import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	ListItem,
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth/client";
import styles from "../styles/Titlebar.module.css";

const listItems: { title: string; href: string; description: string }[] = [
	{
		title: "Home",
		href: "/",
		description: "Virtue's Home Page.",
	},
	{
		title: "Timetable",
		href: "/timetable",
		description: "See our classes and book a place.",
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

/**
 * Renders the title bar component.
 * @returns The JSX element representing the title bar.
 */
const Titlebar = () => {
	const { user, loading, signOut } = useAuth();
	const router = useRouter();
	const isSignedIn = !!user;
	const isAdmin = !!user?.admin;

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
			{loading ? (
				<div />
			) : user ? (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">{user.first_name}</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>{user.email}</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<Link href="/account">Your account</Link>
						</DropdownMenuItem>
						<DropdownMenuItem
							onSelect={async () => {
								await signOut();
								await router.push("/");
							}}
						>
							Sign out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
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
