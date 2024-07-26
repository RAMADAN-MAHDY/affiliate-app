/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: false,
    webpack: (config, { isServer }) => {
      if (isServer) {
        config.resolve.alias['punycode'] = 'punycode/';
      }
      return config;
    },
  
};

export default nextConfig;

