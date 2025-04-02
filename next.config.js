/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export' // Generates static files, outputs to 'out'
};

module.exports = {
  rewrites: ...,       // Array of rewrite rules
  redirects: ...,      // Array of redirect rules
  headers: ...,        // Array of header rules
  trailingSlash: true, // Boolean
  cleanUrls: ...,      // Not a Next.js property, possibly from another framework
  routes: ...,         // Likely the conflicting property
};
