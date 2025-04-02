/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export' // Generates static files, outputs to 'out'
};

module.exports = nextConfig;
