/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is stable in Next.js 14, no experimental flag needed
  reactStrictMode: true,
  swcMinify: true,
  
  // Optimize for production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Enable static exports if needed
  // output: 'export',
  // trailingSlash: true,
  
  // Image optimization
  images: {
    unoptimized: false,
  },
}

module.exports = nextConfig