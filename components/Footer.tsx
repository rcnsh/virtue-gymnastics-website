import Image from "next/image";
import Link from "next/link";
import {
	BiLogoFacebook,
	BiLogoInstagram,
	BiLogoWhatsapp,
	BiLogoYoutube,
} from "react-icons/bi";

/**
 * Footer component for the Virtue Gymnastics website.
 * Renders the footer section with quick links and social media links.
 */
const Footer = () => {
	return (
		<main className={"w-screen bottom-0"}>
			<section className={"backgroundTexture"}>
				<br />
				<br />
				<Image
					src={"/home/scribble.webp"}
					alt={"scribble deco"}
					className={"relative float-right w-[10vw] top-60 right-[35vw]"}
					width={200}
					height={200}
				/>
				<section id="footer-section">
					<div className={"flex w-screen justify-evenly align-middle"}>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={"/virtue-icon.png"}
							alt={"Virtue Icon"}
							className={"w-[15vw] my-20"}
						/>
						<div className={"space-y-2"}>
							<h5 className={"text-3xl"}>QUICK LINKS</h5>
							<Link href={"/"}>Home</Link>
							<br />
							<Link href={"/timetable"}>Timetable</Link>
							<br />
							<Link href={"/bookings/new"}>Book a Class</Link>
							<br />
							<Link href={"/students"}>Your Students</Link>
							<br />
							<Link href={"/bookings"}>Your Bookings</Link>
							<br />
						</div>
						<div>
							<h5 className={"text-3xl"}>SOCIAL MEDIA LINKS</h5>
							<div className={"flex p-5 space-x-10"}>
								<Link href={"https://www.facebook.com/virtuemovementco"}>
									<BiLogoFacebook className={"border-2 border-white w-8 h-8"} />
								</Link>
								<Link href={"https://instagram.com/virtuemovementco"}>
									<BiLogoInstagram
										className={"border-2 border-white w-8 h-8"}
									/>
								</Link>
								<Link href={"https://api.whatsapp.com/send?phone=7715306363"}>
									<BiLogoWhatsapp className={"border-2 border-white w-8 h-8"} />
								</Link>
								<Link
									href={
										"https://www.youtube.com/channel/UCbsY0WKc8xcVGJAq3y_I7Vg"
									}
								>
									<BiLogoYoutube className={"border-2 border-white w-8 h-8"} />
								</Link>
							</div>
						</div>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={"/footer/double wave.webp"}
							alt={"duel wave decoration"}
							className={"w-[15vw] my-20"}
						/>
					</div>
				</section>
			</section>
		</main>
	);
};

export default Footer;
