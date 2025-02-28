import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  
  // Set output to static export
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Properly configure static routes
  experimental: {
    // This helps with static export of App Router
    appDocumentPreloading: false,
  },

  // Optimize for Cloudflare Pages deployment
  webpack: (config, { dev, isServer }) => {
    // Only run in production and for client-side builds
    if (!dev && !isServer) {
      // Optimize production builds
      config.optimization = {
        ...config.optimization,
        minimize: true,
        splitChunks: {
          chunks: 'all',
          maxSize: 20000000, // 20MB chunk size limit
        },
      };
    }
    
    return config;
  },
};

export default withMDX(config);