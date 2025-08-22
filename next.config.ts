// next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  
  images: {
    unoptimized: true
  },
  
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  httpAgentOptions: {
    keepAlive: true,
  },
  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['react-window']
  }
};

export default nextConfig;