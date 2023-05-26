/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = withBundleAnalyzer({
  compress: true,
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: '/cdx/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/cdx/:path*`,
      },
    ];
  },
});

module.exports = nextConfig;
