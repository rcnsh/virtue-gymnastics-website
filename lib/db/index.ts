import { join } from "node:path";
import { createMemoryStore } from "./memory";
import { createPrismaStore } from "./prisma";
import type { Store } from "./types";

export type * from "./types";

/* Postgres (through Prisma) when DATABASE_URL is set, otherwise an in-memory
store seeded with the timetable. Outside Vercel the in-memory store is saved to
.data/dev-store.json; on Vercel it resets whenever a new instance starts. */
function createStore(): Store {
	const url = process.env.DATABASE_URL;
	if (url) return createPrismaStore(url);

	return createMemoryStore(
		process.env.VERCEL
			? undefined
			: join(process.cwd(), ".data", "dev-store.json"),
	);
}

// Reuse one store across hot reloads in dev, so we don't leak connections.
const globalForStore = globalThis as unknown as { store?: Store };

export const db: Store = globalForStore.store ?? createStore();
globalForStore.store = db;
