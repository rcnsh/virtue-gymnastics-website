// Loads the timetable in data/classes.json into an empty database.
// Run with `pnpm db:seed` after `pnpm db:migrate`. Classes that already exist
// and time slots that already exist are left alone.
import { readFileSync } from "node:fs";
import pg from "pg";

const url = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
if (!url) throw new Error("Set DATABASE_URL first.");

const rows = JSON.parse(
	readFileSync(new URL("../data/classes.json", import.meta.url), "utf8"),
);
const client = new pg.Client({ connectionString: url });
await client.connect();

try {
	await client.query("BEGIN");
	const seen = new Set();
	let added = 0;
	for (const row of rows) {
		if (!seen.has(row.id)) {
			seen.add(row.id);
			const { rowCount } = await client.query(
				`INSERT INTO "Class" (id, name, cost, "backgroundColor", description, "ageGroup")
				 VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO NOTHING`,
				[
					row.id,
					row.name,
					row.cost,
					row.backgroundColor,
					row.description,
					row.age || null,
				],
			);
			added += rowCount;
		}
		await client.query(
			`INSERT INTO "Schedule" ("classId", "startTime", "endTime", "daysOfWeek")
			 SELECT $1::varchar, $2::varchar, $3::varchar, $4::int[] WHERE NOT EXISTS (
			   SELECT 1 FROM "Schedule"
			   WHERE "classId" = $1::varchar AND "startTime" = $2::varchar AND "daysOfWeek" = $4::int[])`,
			[row.id, row.startTime, row.endTime, row.daysOfWeek],
		);
	}
	await client.query("COMMIT");
	console.log(`Seeded ${added} classes.`);
} catch (error) {
	await client.query("ROLLBACK");
	throw error;
} finally {
	await client.end();
}
