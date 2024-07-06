import { env } from "./env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: env.API_REWRITE_DESTINATION_URL + '/:path*',
            },
        ];
    },
};

export default nextConfig;
