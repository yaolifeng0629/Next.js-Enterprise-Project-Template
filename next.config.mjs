/** @type {import('next').NextConfig} */
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === 'true'
});

const nextConfig = {
    compiler: {
        styledComponents: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.test.com'
            }
        ]
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `http://localhost:8000/api/:path*`,
                basePath: false
            }
        ];
    },
    reactStrictMode: false // Strict patterns are primarily used to identify unsafe lifecycles, outdated APIs, etc. However, in development mode, the component is executed twice, which means that the interface is called multiple times, so turn off the mode.
};

export default withBundleAnalyzer(nextConfig);
