/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["mui-tel-input"],
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "", // Оставляем пустым, если порт не используется
        pathname: "/**", // Используем маску для любых путей
      },
    ],
  },
};

export default nextConfig;
