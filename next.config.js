/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: '/cdx/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/cdx/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
