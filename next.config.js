/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export', // Generates static files, outputs to 'out'
  trailingSlash: true, // Boolean
  rewrites: async () => [], // Empty array for rewrite rules
  redirects: async () => [], // Empty array for redirect rules
  headers: async () => [] // Empty array for header rules
};

module.exports = nextConfig;
