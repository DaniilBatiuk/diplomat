/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["mui-tel-input"],
  reactStrictMode: false,
  images: {
    domains: ["utfs.io"],
  },
};

export default nextConfig;
