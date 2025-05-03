/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  // desabilita o PWA em dev para não precisar rebuildar o service worker
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    // Substituindo domains por remotePatterns (configuração recomendada)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = withPWA(nextConfig);
