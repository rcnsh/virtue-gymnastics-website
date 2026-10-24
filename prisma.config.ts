import { existsSync } from "node:fs";
import { defineConfig } from "prisma/config";

// The Prisma CLI no longer reads .env itself.
for (const file of [".env.local", ".env"]) {
	if (existsSync(file)) process.loadEnvFile(file);
}

export default defineConfig({
	schema: "prisma/schema.prisma",
	migrations: { path: "prisma/migrations" },
	// Migrations need a direct (non-pooled) connection when one is available.
	// Empty is fine for `prisma generate`, which never connects.
	datasource: {
		url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "",
	},
});
