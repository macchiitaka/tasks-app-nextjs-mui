/**
 * @type {import('next').NextConfig}
 */
const config = {
  experimental: {
    esmExternals: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  swcMinify: true,
  compiler: {
    removeConsole: true,
  },
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  // eslint-disable-next-line dot-notation
  enabled: process.env['ANALYZE'] === 'true',
});

module.exports = withBundleAnalyzer(config);
