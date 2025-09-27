/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove static export for Netlify - let Netlify handle it
  trailingSlash: true,
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  eslint: {
    // Disable ESLint during build for deployment
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable type checking during build for deployment
    ignoreBuildErrors: true,
  },
  // Reduce caching for faster development feedback
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, stale-while-revalidate=30',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig