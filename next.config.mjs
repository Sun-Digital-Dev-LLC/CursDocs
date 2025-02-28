import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  
  // Add Cloudflare Pages specific configuration
  // This will help reduce file sizes and avoid caching issues
  webpack: (config, { dev, isServer }) => {
    // Only run in production and for client-side builds
    if (!dev && !isServer) {
      // Set production optimizations
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
  
  // Explicitly configure output settings for better Cloudflare compatibility
  output: 'export', // Static export mode works well with Cloudflare Pages
  
  // Disable image optimization which can create large cache files
  images: {
    unoptimized: true,
  },
};

export default withMDX(config);