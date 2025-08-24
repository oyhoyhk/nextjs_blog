/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel 배포를 위해 output: 'export' 제거
  trailingSlash: false,
  images: {
    unoptimized: false,
  },
}

module.exports = nextConfig