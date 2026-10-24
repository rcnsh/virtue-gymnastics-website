import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import seedClasses from "@/data/classes.json";
import type {
	Booking,
	Class,
	Schedule,
	Session,
	Store,
	Student,
	User,
} from "./types";

/* A stand-in for Postgres so the site runs with no database configured.
Data lives in memory and, when a file path is given, is saved to a JSON file
after every change so it survives dev server restarts. */

type UserRecord = User & { password_hash: string | null };

type Data = {
	users: UserRecord[];
	sessions: Session[];
	students: Student[];
	bookings: Booking[];
	classes: Class[];
	schedules: Schedule[];
	nextStudentId: number;
	nextBookingId: number;
};

/* data/classes.json is the old flat timetable export: one row per class per
time slot. Split it back into classes and their schedules. */
function seed(): Data {
	const classes = new Map<string, Class>();
	const schedules: Schedule[] = [];

	for (const row of seedClasses) {
		if (!classes.has(row.id)) {
			classes.set(row.id, {
				id: row.id,
				name: row.name,
				cost: row.cost,
				backgroundColor: row.backgroundColor,
				description: row.description,
				ageGroup: row.age || null,
			});
		}
		schedules.push({
			id: schedules.length + 1,
			classId: row.id,
			startTime: row.startTime,
			endTime: row.endTime,
			daysOfWeek: row.daysOfWeek,
		});
	}

	return {
		users: [],
		sessions: [],
		students: [],
		bookings: [],
		classes: [...classes.values()],
		schedules,
		nextStudentId: 1,
		nextBookingId: 1,
	};
}

function load(file: string | undefined): Data {
	if (!file) return seed();
	try {
		return JSON.parse(readFileSync(file, "utf8"));
	} catch {
		return seed();
	}
}

const publicUser = ({ password_hash: _, ...user }: UserRecord): User => user;

export function createMemoryStore(file?: string): Store {
	const data = load(file);

	const save = () => {
		if (!file) return;
		mkdirSync(dirname(file), { recursive: true });
		writeFileSync(file, JSON.stringify(data, null, "\t"));
	};

	const byName = (a: Class, b: Class) => a.name.localeCompare(b.name);

	return {
		users: {
			list: async () => data.users.map(publicUser),
			find: async (user_id) => {
				const user = data.users.find((u) => u.user_id === user_id);
				return user ? publicUser(user) : null;
			},
			findCredentials: async (email) => {
				const user = data.users.find((u) => u.email === email);
				return user
					? { user: publicUser(user), password_hash: user.password_hash }
					: null;
			},
			create: async (input) => {
				if (data.users.some((u) => u.email === input.email)) {
					throw new Error("A user with that email already exists");
				}
				const user: UserRecord = {
					...input,
					user_id: crypto.randomUUID(),
					created_at: new Date().toISOString(),
				};
				data.users.push(user);
				save();
				return publicUser(user);
			},
			setAdmin: async (user_id, admin) => {
				const user = data.users.find((u) => u.user_id === user_id);
				if (user) user.admin = admin;
				save();
			},
			setPasswordHash: async (user_id, password_hash) => {
				const user = data.users.find((u) => u.user_id === user_id);
				if (user) user.password_hash = password_hash;
				save();
			},
			delete: async (user_id) => {
				const studentIds = new Set(
					data.students
						.filter((s) => s.user_id === user_id)
						.map((s) => s.student_id),
				);
				data.users = data.users.filter((u) => u.user_id !== user_id);
				data.sessions = data.sessions.filter((s) => s.user_id !== user_id);
				data.students = data.students.filter((s) => s.user_id !== user_id);
				data.bookings = data.bookings.filter(
					(b) => b.user_id !== user_id && !studentIds.has(b.student_id),
				);
				save();
			},
		},
		sessions: {
			create: async (session) => {
				data.sessions.push(session);
				save();
			},
			find: async (id) => data.sessions.find((s) => s.id === id) ?? null,
			extend: async (id, expires_at) => {
				const session = data.sessions.find((s) => s.id === id);
				if (session) session.expires_at = expires_at;
				save();
			},
			delete: async (id) => {
				data.sessions = data.sessions.filter((s) => s.id !== id);
				save();
			},
			deleteForUser: async (user_id) => {
				data.sessions = data.sessions.filter((s) => s.user_id !== user_id);
				save();
			},
		},
		students: {
			list: async () => data.students,
			listForUser: async (user_id) =>
				data.students.filter((s) => s.user_id === user_id),
			find: async (student_id) =>
				data.students.find((s) => s.student_id === student_id) ?? null,
			create: async (input) => {
				const student = { ...input, student_id: data.nextStudentId++ };
				data.students.push(student);
				save();
				return student;
			},
			delete: async (student_id) => {
				data.students = data.students.filter(
					(s) => s.student_id !== student_id,
				);
				data.bookings = data.bookings.filter(
					(b) => b.student_id !== student_id,
				);
				save();
			},
		},
		bookings: {
			list: async () => data.bookings,
			listForUser: async (user_id) =>
				data.bookings.flatMap((booking) => {
					const student = data.students.find(
						(s) => s.student_id === booking.student_id,
					);
					return booking.user_id === user_id && student
						? [{ ...booking, student }]
						: [];
				}),
			listForStudent: async (student_id) =>
				data.bookings.filter((b) => b.student_id === student_id),
			find: async (booking_id) =>
				data.bookings.find((b) => b.booking_id === booking_id) ?? null,
			exists: async (student_id, selected_class) =>
				data.bookings.some(
					(b) =>
						b.student_id === student_id && b.selected_class === selected_class,
				),
			create: async (input) => {
				data.bookings.push({
					...input,
					booking_id: data.nextBookingId++,
					created_at: new Date().toISOString(),
				});
				save();
			},
			delete: async (booking_id) => {
				data.bookings = data.bookings.filter(
					(b) => b.booking_id !== booking_id,
				);
				save();
			},
		},
		classes: {
			list: async () =>
				[...data.classes].sort(byName).map((c) => ({
					...c,
					schedules: data.schedules.filter((s) => s.classId === c.id),
				})),
			find: async (id) => data.classes.find((c) => c.id === id) ?? null,
			delete: async (id) => {
				data.classes = data.classes.filter((c) => c.id !== id);
				data.schedules = data.schedules.filter((s) => s.classId !== id);
				save();
			},
		},
		schedules: {
			list: async () => data.schedules,
			delete: async (id) => {
				data.schedules = data.schedules.filter((s) => s.id !== id);
				save();
			},
		},
	};
}
