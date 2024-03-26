/* imports */

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import prisma from "@/lib/prisma";
import styles from "@/styles/Timetable.module.css";
import adaptivePlugin from "@fullcalendar/adaptive";
import { EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

/* define a type for our data */

type Class = {
	schedules: {
		id: number;
		classId: string;
		startTime: string;
		endTime: string;
		daysOfWeek: number[];
	}[];
	id: string;
	name: string;
	cost: string;
	backgroundColor: string;
	description: string;
	ageGroup: string | null;
};

type FlattenedClass = {
	id: string;
	name: string;
	startTime: string;
	endTime: string;
	cost: string;
	daysOfWeek: number[];
	backgroundColor: string;
	age: string | null;
	description: string;
};

/* set up timetable component and take in the classes data */

function Timetable({ classes }: { classes: FlattenedClass[] }) {
	/* define states for our class pop up modal */

	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [eventInfo, setEventInfo] = useState<EventClickArg | null>(null);

	return (
		<>
			<Head>
				<title>Virtue Movement - Timetable</title>
				<meta name="description" content="Virtue Movement" />
			</Head>
			<div className={styles.calendar}>
				{/* use the FullCalender library to render a calendar with our given data */}
				<FullCalendar
					schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
					plugins={[
						dayGridPlugin,
						timeGridPlugin,
						adaptivePlugin,
						interactionPlugin,
						listPlugin,
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

export async function getStaticProps() {
	const classesProp = (await prisma.$queryRaw`
  SELECT 
    "Class"."id",
    "Class"."name",
    "Class"."cost",
    "Class"."backgroundColor",
    "Class"."description",
    "Class"."ageGroup",
    (
      SELECT 
        json_agg(
          json_build_object(
            'id', "Schedule"."id",
            'classId', "Schedule"."classId",
            'startTime', "Schedule"."startTime",
            'endTime', "Schedule"."endTime",
            'daysOfWeek', "Schedule"."daysOfWeek"
          )
        )
      FROM "Schedule"
      WHERE "Schedule"."classId" = "Class"."id"
    ) AS "schedules"
  FROM "Class";
`) as Class[];

	const classes = classesProp.flatMap((classItem) =>
		classItem.schedules.map((schedule) => ({
			id: classItem.id,
			title: classItem.name,
			startTime: schedule.startTime,
			endTime: schedule.endTime,
			cost: classItem.cost,
			daysOfWeek: schedule.daysOfWeek.map((day) => day + 1),
			backgroundColor: classItem.backgroundColor,
			age: classItem.ageGroup,
			description: classItem.description,
		})),
	);
	return {
		props: {
			classes,
		},
		revalidate: 86400,
	};
}

export default Timetable;
