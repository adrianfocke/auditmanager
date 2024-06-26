export default {
  images: {
    domains: ['assets.tina.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.tina.io',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ];
  },
};
