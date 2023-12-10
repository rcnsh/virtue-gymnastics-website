/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "res.cloudinary.com",
			},
		],
	},

	reactStrictMode: true,
	compiler: {},
	experimental: {
		scrollRestoration: true,
	},
};

module.exports = nextConfig;
