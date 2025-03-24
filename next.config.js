/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  // trailingSlash: true, // Static Routing ফিক্স করবে
  // basePath: process.env.NODE_ENV === 'production' ? '/test2' : '',

  reactStrictMode: true,
  swcMinify: true,

  experimental: {
    // Remove esmExternals as it's causing issues
    // esmExternals: 'loose',
    // Update serverActions to be an object instead of boolean
    serverActions: {
      bodySizeLimit: '2mb'
    },
  },
  transpilePackages: ['@react-pdf/renderer'], // ESM প্যাকেজকে ট্রান্সপাইল করবে

  webpack(config, { isServer }) {
    // SVG handling
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: { not: /\.(css|scss|sass)$/ },
        resourceQuery: { not: /url/ },
        loader: '@svgr/webpack',
        options: {
          dimensions: false,
          titleProp: true,
        },
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    if (isServer) {
      config.externals.push('puppeteer');
    }

    // Font handling
    config.module.rules.push({
      test: /\.(ttf|woff|woff2|eot)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/fonts/[name][ext]'
      }
    });

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        stream: false,
        path: false
      };
    }

    return config;
  },

  images: {
    unoptimized: true,
  },

  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
