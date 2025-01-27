/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
    images: {
      remotePatterns: [{hostname: "cdn.discordapp.com"}]
    }
};



export default nextConfig;
