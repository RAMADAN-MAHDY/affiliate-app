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
  
    headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: `
                default-src 'self';
                script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://vercel.live;
                connect-src 'self' https://affiliate-api-lilac.vercel.app https://www.googletagmanager.com https://vercel.live https://www.google-analytics.com;
                img-src 'self' data: https:;
                style-src 'self' 'unsafe-inline';
                font-src 'self' https:;
                frame-src 'self' https://vercel.live;
              `.replace(/\s{2,}/g, ' ').trim(),
            },
            {
              key: 'X-Frame-Options',
              value: 'SAMEORIGIN',
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin',
            },
            {
              key: 'Permissions-Policy',
              value: 'camera=(), microphone=(), geolocation=()',
            },
          ],
        },
      ];
    },
  };
  
export default nextConfig;