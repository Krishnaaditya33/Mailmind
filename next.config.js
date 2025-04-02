/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
};

module.exports = {
  output: 'export', // Enables static export
  distDir: 'public', // Changes output from 'out' to 'public'
};
