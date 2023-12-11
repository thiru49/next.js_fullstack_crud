/** @type {import('next').NextConfig} */
const nextConfig = {
     experimental: {
       serverComponentsExternalPackages: ["mongoose"],
     },
     images: {
          domains: ['avatars.githubusercontent.com'],
     },
  
   }
   
module.exports = nextConfig;
   