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
    // libera o domínio dos avatares do Google para o <Image> do Next.js
    domains: ['lh3.googleusercontent.com'],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = withPWA(nextConfig);
