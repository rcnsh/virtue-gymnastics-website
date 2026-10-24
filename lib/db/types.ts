/* Shapes the app works with, independent of where they're stored. Every value
is JSON-serialisable so it can be returned from getServerSideProps as-is. */

export type User = {
	user_id: string;
	first_name: string;
	last_name: string;
	email: string;
	admin: boolean;
	created_at: string;
};

export type NewUser = {
	first_name: string;
	last_name: string;
	email: string;
	password_hash: string;
	admin: boolean;
};

export type Session = {
	id: string;
	user_id: string;
	expires_at: string;
};

export type Student = {
	student_id: number;
	user_id: string;
	address1: string | null;
	address2: string | null;
	city: string;
	county: string;
	postcode: string;
	home_phone: string | null;
	work_phone: string | null;
	mobile_phone1: string;
	mobile_phone2: string | null;
	hear_about_us: string;
	student_first_name: string;
	student_last_name: string;
	student_dob: string;
	student_gender: string;
	student_medical_conditions: string[];
	student_additional_info: string | null;
	student_preferred_days: string[];
	student_photo_consent: boolean;
	student_video_consent: boolean;
	student_walking_home_consent: boolean;
	terms_and_conditions: boolean;
	privacy_policy: boolean;
	marketing_consent: boolean;
};

export type NewStudent = Omit<Student, "student_id">;

export type Booking = {
	booking_id: number;
	student_id: number;
	user_id: string;
	selected_class: string;
	created_at: string;
};

export type BookingWithStudent = Booking & { student: Student };

export type Schedule = {
	id: number;
	classId: string;
	startTime: string;
	endTime: string;
	/** 0 = Monday … 6 = Sunday */
	daysOfWeek: number[];
};

export type Class = {
	id: string;
	name: string;
	cost: string;
	backgroundColor: string;
	description: string;
	ageGroup: string | null;
};

export type ClassWithSchedules = Class & { schedules: Schedule[] };

export interface Store {
	users: {
		list(): Promise<User[]>;
		find(user_id: string): Promise<User | null>;
		/** Includes the password hash, so only the auth code should call it. */
		findCredentials(
			email: string,
		): Promise<{ user: User; password_hash: string | null } | null>;
		create(user: NewUser): Promise<User>;
		setAdmin(user_id: string, admin: boolean): Promise<void>;
		setPasswordHash(user_id: string, password_hash: string): Promise<void>;
		/** Also deletes the user's sessions, students and bookings. */
		delete(user_id: string): Promise<void>;
	};
	sessions: {
		create(session: Session): Promise<void>;
		find(id: string): Promise<Session | null>;
		extend(id: string, expires_at: string): Promise<void>;
		delete(id: string): Promise<void>;
		deleteForUser(user_id: string): Promise<void>;
	};
	students: {
		list(): Promise<Student[]>;
		listForUser(user_id: string): Promise<Student[]>;
		find(student_id: number): Promise<Student | null>;
		create(student: NewStudent): Promise<Student>;
		/** Also deletes the student's bookings. */
		delete(student_id: number): Promise<void>;
	};
	bookings: {
		list(): Promise<Booking[]>;
		listForUser(user_id: string): Promise<BookingWithStudent[]>;
		listForStudent(student_id: number): Promise<Booking[]>;
		find(booking_id: number): Promise<Booking | null>;
		exists(student_id: number, selected_class: string): Promise<boolean>;
		create(booking: Omit<Booking, "booking_id" | "created_at">): Promise<void>;
		delete(booking_id: number): Promise<void>;
	};
	classes: {
		list(): Promise<ClassWithSchedules[]>;
		find(id: string): Promise<Class | null>;
		/** Also deletes the class's schedules. */
		delete(id: string): Promise<void>;
	};
	schedules: {
		list(): Promise<Schedule[]>;
		delete(id: number): Promise<void>;
	};
}
