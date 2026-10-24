import { defineConfig } from "cypress";

/**
 * Cypress configuration file. Runs against a local server
 * (`pnpm build && pnpm start`), which uses the in-memory store when
 * DATABASE_URL isn't set.
 * @module cypress.config
 */
export default defineConfig({
	e2e: {
		baseUrl: process.env.CYPRESS_BASE_URL ?? "http://localhost:3000",
	},
	video: false,
});
