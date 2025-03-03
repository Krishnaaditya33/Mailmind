// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        net: false,
        tls: false,
        fs: false,
        // add any others that might cause issues
      };
    }
    return config;
  },
};
