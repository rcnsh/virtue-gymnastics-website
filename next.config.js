/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  reactStrictMode: true,
  compiler: {},
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
