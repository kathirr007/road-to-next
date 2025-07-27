import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    staleTimes: { // client side caching between the router navigation
      dynamic: 30,
    },
  },
}

export default nextConfig
