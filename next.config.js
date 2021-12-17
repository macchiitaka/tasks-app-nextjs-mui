/**
 * @type {import('next').NextConfig}
 */
const config = {
  experimental: {
    esmExternals: true,
  },
  typescript: {
    ignoreDevErrors: true,
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(config);
