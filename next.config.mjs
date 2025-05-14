/** @type {import('next').NextConfig} */
const nextConfig = {
      images: {
    domains: ['i.postimg.cc'],
  },
    reactStrictMode: true,
    experimental: {
      serverActions: true,
    },
  };
  
  export default nextConfig;
  