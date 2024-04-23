const { withAxiom } = require("next-axiom");

/**
 * Configuration object for Next.js.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "res.cloudinary.com",
			},
		],
	},

	reactStrictMode: true,
};

module.exports = withAxiom(nextConfig);
