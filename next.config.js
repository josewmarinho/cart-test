/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: { 
    remotePatterns: [
      {protocol: "https", hostname: "**"}
    ],
  },
  async rewrites() {
    return [
      {
        source: '/auth/:path*',
        destination: '/auth/:path*',
      },
      {
        source: '/:path/p/:product*',
        destination: '/produtos/:path/p/:product*',
      },
    ]
  },
}

module.exports = nextConfig
