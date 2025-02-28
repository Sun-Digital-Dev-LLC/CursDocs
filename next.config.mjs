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
  
  // Add webpack configuration to reduce bundle size
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

  // Properly configure static routes
  experimental: {
    // This helps with static export of App Router
    appDocumentPreloading: false,
  },
};

export default withMDX(config);