import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    cssChunking: true,
    inlineCss: true,
    optimizeCss: true,
    // useLightningcss: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
        pathname: '/img/**',
      },
    ],
  },
};

export default nextConfig;

// How to export as static build
// const nextConfig: NextConfig = {
//   output: 'export',
//   images: {
//     unoptimized: true,
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'fakestoreapi.com',
//         port: '',
//         pathname: '/img/**',
//       },
//     ],
//   },
// };

// export default nextConfig;
