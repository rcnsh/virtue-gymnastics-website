import { defineConfig } from "cypress";

/**
 * Cypress configuration file.
 * @module cypress.config
 */
export default defineConfig({
	e2e: {
		baseUrl: "https://virtue.rcn.sh",
	},
	projectId: "rzbtfg",
	video: true,
	videoCompression: true,
	env: {
		EMAIL: "testuser+clerk_test@virtue.com",
		PASSWORD: "testpasswordvirtue",
	},
});
