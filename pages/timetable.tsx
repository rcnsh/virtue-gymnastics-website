/* imports */

import FullCalendar, { type EventClickInfo } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import interactionPlugin from "@fullcalendar/react/interaction";
import listPlugin from "@fullcalendar/react/list";
import classicThemePlugin from "@fullcalendar/react/themes/classic";
import timeGridPlugin from "@fullcalendar/react/timegrid";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { db } from "@/lib/db";
import styles from "@/styles/Timetable.module.css";
import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/classic/theme.css";
import "@fullcalendar/react/themes/classic/palette.css";
import "temporal-polyfill/global";
import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

/* define a type for our data */

type FlattenedClass = {
	id: string;
	title: string;
	startTime: string;
	endTime: string;
	cost: string;
	daysOfWeek: number[];
	backgroundColor: string;
	age: string | null;
	description: string;
};

/**
 * Renders a timetable component with a calendar and class pop up modal.
 *
 * @param {Object} props - The component props.
 * @param {FlattenedClass[]} props.classes - The array of classes to be displayed on the timetable.
 * @returns {JSX.Element} The rendered timetable component.
 */
function Timetable({ classes }: { classes: FlattenedClass[] }) {
	/* define states for our class pop up modal */

	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [eventInfo, setEventInfo] = useState<EventClickInfo | null>(null);

	return (
		<>
			<Head>
				<title>Virtue Movement - Timetable</title>
				<meta name="description" content="Virtue Movement" />
			</Head>
			<div className={styles.calendar}>
				{/* use the FullCalender library to render a calendar with our given data */}
				<FullCalendar
					plugins={[
						dayGridPlugin,
						timeGridPlugin,
						interactionPlugin,
						listPlugin,
						classicThemePlugin,
					]}
					headerToolbar={{
						left: "prev,next today",
						center: "title",
						right: "dayGridMonth,timeGridWeek,listWeek",
					}}
					initialView="dayGridMonth"
					nowIndicator={false}
					editable={false}
					selectable={true}
					selectMirror={true}
					eventClick={(info) => {
						setModalIsOpen(true);
						setEventInfo(info);
					}}
					events={classes}
					eventTimeFormat={{
						hour: "numeric",
						minute: "2-digit",
						meridiem: false,
					}}
					weekNumberCalculation={"ISO"}
				/>
				{/* define our class pop up dialog modal */}
				<Dialog open={modalIsOpen} onOpenChange={setModalIsOpen}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle className={"text-center"}>
								{eventInfo?.event?.title}
							</DialogTitle>
							<DialogDescription>
								<p className={"text-center"}>
									{eventInfo?.event?.extendedProps?.cost}
								</p>
								<p className={"text-center"}>
									{eventInfo?.event?.extendedProps?.age}
								</p>
							</DialogDescription>
						</DialogHeader>
						<p>{eventInfo?.event?.extendedProps?.description}</p>
						<Link href={`/bookings/new?class=${eventInfo?.event?.id}`}>
							<Button className={"w-full"} type={"submit"}>
								Book This Class
							</Button>
						</Link>
					</DialogContent>
				</Dialog>
			</div>
		</>
	);
}

/* fetch the timetable data STATICALLY because this data will remain the same
most of the time and will decrease loading times significantly */

export const getStaticProps: GetStaticProps = async () => {
	const classesProp = await db.classes.list();

	const classes = classesProp.flatMap((classItem) =>
		classItem.schedules.map((schedule) => ({
			id: classItem.id,
			title: classItem.name,
			startTime: schedule.startTime,
			endTime: schedule.endTime,
			cost: classItem.cost,
			// stored as 0 = Monday; FullCalendar wants 0 = Sunday
			daysOfWeek: schedule.daysOfWeek.map((day) => (day + 1) % 7),
			backgroundColor: classItem.backgroundColor,
			age: classItem.ageGroup,
			description: classItem.description,
		})),
	);
	return {
		props: {
			classes,
		},
		// pick up class changes made by admins without a rebuild
		revalidate: 60,
	};
};

export default Timetable;
