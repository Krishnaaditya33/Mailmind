/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,  // Enables React strict mode for better error catching
  swcMinify: true,        // Uses SWC for faster minification
  output: 'export',       // Generates a static site in the 'out' directory
};

module.exports = nextConfig;
