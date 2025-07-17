/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.suitdev.com',
        port: '',
        pathname: '/storage/files/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/ideas',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
