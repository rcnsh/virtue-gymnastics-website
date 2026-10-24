import { PrismaPg } from "@prisma/adapter-pg";
import {
	type bookings as BookingRow,
	PrismaClient,
	type students as StudentRow,
	type users as UserRow,
} from "@/lib/generated/prisma/client";
import type { Booking, Store, Student, User } from "./types";

const toUser = ({ password_hash: _, ...row }: UserRow): User => ({
	...row,
	admin: !!row.admin,
	created_at: row.created_at.toISOString(),
});

const toStudent = (row: StudentRow): Student => ({
	...row,
	student_photo_consent: !!row.student_photo_consent,
	student_video_consent: !!row.student_video_consent,
	student_walking_home_consent: !!row.student_walking_home_consent,
	terms_and_conditions: !!row.terms_and_conditions,
	privacy_policy: !!row.privacy_policy,
	marketing_consent: !!row.marketing_consent,
});

const toBooking = (row: BookingRow): Booking => ({
	...row,
	created_at: row.created_at.toISOString(),
});

export function createPrismaStore(connectionString: string): Store {
	const prisma = new PrismaClient({
		adapter: new PrismaPg({ connectionString }),
	});

	return {
		users: {
			list: async () =>
				(await prisma.users.findMany({ orderBy: { created_at: "asc" } })).map(
					toUser,
				),
			find: async (user_id) => {
				const row = await prisma.users.findUnique({ where: { user_id } });
				return row && toUser(row);
			},
			findCredentials: async (email) => {
				const row = await prisma.users.findUnique({ where: { email } });
				return row && { user: toUser(row), password_hash: row.password_hash };
			},
			create: async (user) =>
				toUser(
					await prisma.users.create({
						data: { ...user, user_id: crypto.randomUUID() },
					}),
				),
			setAdmin: async (user_id, admin) => {
				await prisma.users.update({ where: { user_id }, data: { admin } });
			},
			setPasswordHash: async (user_id, password_hash) => {
				await prisma.users.update({
					where: { user_id },
					data: { password_hash },
				});
			},
			delete: async (user_id) => {
				await prisma.users.deleteMany({ where: { user_id } });
			},
		},
		sessions: {
			create: async (session) => {
				await prisma.sessions.create({
					data: { ...session, expires_at: new Date(session.expires_at) },
				});
			},
			find: async (id) => {
				const row = await prisma.sessions.findUnique({ where: { id } });
				return row && { ...row, expires_at: row.expires_at.toISOString() };
			},
			extend: async (id, expires_at) => {
				await prisma.sessions.updateMany({
					where: { id },
					data: { expires_at: new Date(expires_at) },
				});
			},
			delete: async (id) => {
				await prisma.sessions.deleteMany({ where: { id } });
			},
			deleteForUser: async (user_id) => {
				await prisma.sessions.deleteMany({ where: { user_id } });
			},
		},
		students: {
			list: async () =>
				(
					await prisma.students.findMany({ orderBy: { student_id: "asc" } })
				).map(toStudent),
			listForUser: async (user_id) =>
				(
					await prisma.students.findMany({
						where: { user_id },
						orderBy: { student_id: "asc" },
					})
				).map(toStudent),
			find: async (student_id) => {
				const row = await prisma.students.findUnique({ where: { student_id } });
				return row && toStudent(row);
			},
			create: async (student) =>
				toStudent(await prisma.students.create({ data: student })),
			delete: async (student_id) => {
				await prisma.students.deleteMany({ where: { student_id } });
			},
		},
		bookings: {
			list: async () =>
				(
					await prisma.bookings.findMany({ orderBy: { booking_id: "asc" } })
				).map(toBooking),
			listForUser: async (user_id) =>
				(
					await prisma.bookings.findMany({
						where: { user_id },
						include: { student: true },
						orderBy: { booking_id: "asc" },
					})
				).map(({ student, ...booking }) => ({
					...toBooking(booking),
					student: toStudent(student),
				})),
			listForStudent: async (student_id) =>
				(
					await prisma.bookings.findMany({
						where: { student_id },
						orderBy: { booking_id: "asc" },
					})
				).map(toBooking),
			find: async (booking_id) => {
				const row = await prisma.bookings.findUnique({ where: { booking_id } });
				return row && toBooking(row);
			},
			exists: async (student_id, selected_class) =>
				(await prisma.bookings.count({
					where: { student_id, selected_class },
				})) > 0,
			create: async (booking) => {
				await prisma.bookings.create({ data: booking });
			},
			delete: async (booking_id) => {
				await prisma.bookings.deleteMany({ where: { booking_id } });
			},
		},
		classes: {
			list: () =>
				prisma.class.findMany({
					include: { schedules: { orderBy: { id: "asc" } } },
					orderBy: { name: "asc" },
				}),
			find: (id) => prisma.class.findUnique({ where: { id } }),
			delete: async (id) => {
				await prisma.class.deleteMany({ where: { id } });
			},
		},
		schedules: {
			list: () => prisma.schedule.findMany({ orderBy: { id: "asc" } }),
			delete: async (id) => {
				await prisma.schedule.deleteMany({ where: { id } });
			},
		},
	};
}
