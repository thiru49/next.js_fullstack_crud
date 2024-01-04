/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:false,
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      {
        // Allow images from all domains with HTTPS protocol
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
};

module.exports = nextConfig;
