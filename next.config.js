/** @type {import('next').NextConfig} */
const nextConfig = {


  reactStrictMode: true,
  swcMinify: true,

  // Uncoment to add domain whitelist
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'res.cloudinary.com',
  //     },
  //   ]
  // },
  experimental: {
    esmExternals: 'loose', // ESM প্যাকেজ গুলো লুজ মোডে কনভার্ট করবে
    serverActions: true,
  },
  transpilePackages: ['@react-pdf/renderer'], // ESM প্যাকেজকে ট্রান্সপাইল করবে

  webpack(config, { isServer }) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: { not: /\.(css|scss|sass)$/ },
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        loader: '@svgr/webpack',
        options: {
          dimensions: false,
          titleProp: true,
        },
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    if (isServer) {
      config.externals.push('puppeteer');
    }

    return config;
  },
};

module.exports = nextConfig;
