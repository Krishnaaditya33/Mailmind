// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        http2: false,
        net: false,
        tls: false,
        fs: false,
        child_process: false,
      };
    }
    return config;
  },
};

