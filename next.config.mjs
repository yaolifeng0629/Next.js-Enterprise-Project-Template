/** @type {import('next').NextConfig} */
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === 'true' //当环境变量ANALYZE为true时开启
});

const nextConfig = {
    compiler: {
        styledComponents: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https', //图片资源的协议
                hostname: 'www.test.com' //图片资源的域名
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
    reactStrictMode: false // 严格模式主要用于识别不安全的生命周期、过时的API等情况。但在开发模式下，会让组件执行两次，意味着会多次调用接口，因此需关闭该模式
};

export default withBundleAnalyzer(nextConfig);
