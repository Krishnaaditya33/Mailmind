/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
};

module.exports = {
  output: 'export', // Generates static files
  // No distDir needed, output goes to 'out' by default
};
