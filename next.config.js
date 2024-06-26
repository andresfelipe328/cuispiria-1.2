/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "spoonacular.com",
      },
      {
        protocol: "https",
        hostname: "img.spoonacular.com",
      },
    ],
  },
};

module.exports = nextConfig;
