/** @type {import('next').NextConfig} */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
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