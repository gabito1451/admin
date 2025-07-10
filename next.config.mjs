/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  eslint: {
    dirs: ['app', 'components', 'features', 'lib', 'hooks', 'store', 'types'],
  },
  poweredByHeader: false,
  compress: true,
  // Add these configurations
  webpack: (config, { isServer }) => {
    // Optimize chunk size
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: false,
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
        lib: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // Add null check before accessing match result
            const match = module.context.match(/[\\/]node_modules[\\/](.+?)(?:[\\/]|$)/);
            return match ? `npm.${match[1].replace('@', '')}` : 'npm.unknown';
          },
          chunks: 'all',
        },
      },
    };
    return config;
  },
};

export default nextConfig;
