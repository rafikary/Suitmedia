/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.suitdev.com',
        port: '',
        pathname: '/storage/files/**',
      }, // <-- KOMA YANG HILANG ADA DI SINI
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/ideas',
        permanent: true,
      },
    ]
  },
}

export default nextConfig;