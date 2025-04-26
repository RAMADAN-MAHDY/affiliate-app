/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
      serverActions: true,
    },
    headers: async () => {
      return [
        {
          source: '/(.*)', // Apply to all pages
          headers: [
            {
              key: 'Content-Security-Policy',
              value: `
                default-src 'self';
                script-src 'self' https://www.googletagmanager.com;
                connect-src 'self' https://www.google-analytics.com;
                img-src 'self' data: https://www.google-analytics.com;
                style-src 'self' 'unsafe-inline';
                font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;
                frame-src https://www.googletagmanager.com;
              `.replace(/\s{2,}/g, ' ').trim(),
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  