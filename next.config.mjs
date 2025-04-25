/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
      ],
    },
  
    productionBrowserSourceMaps: false,
  
    webpack: (config, { isServer }) => {
      if (isServer) {
        config.resolve.alias['punycode'] = 'punycode/';
      }
      return config;
    },
  
    async headers() {
      const securityHeaders = [
        {
          key: "Content-Security-Policy",
          value: `
            default-src 'self';
            script-src 'self' 'unsafe-inline' 'unsafe-eval';
            style-src 'self' 'unsafe-inline';
            img-src 'self' data:;
            font-src 'self';
            connect-src 'self';
            frame-ancestors 'self';
          `.replace(/\n/g, ""),
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ];
  
      return [
        {
          source: "/(.*)",
          headers: securityHeaders,
        },
      ];
    },
  };
  
  export default nextConfig;
  