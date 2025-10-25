const { version } = require('./package.json')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    version,
  },
  images: {
    domains: ['localhost'],
  },
  turbopack: {
    // Apply SVGR so .svg imports are React components (like your webpack rule)
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },

  },
}

module.exports = {
  ...nextConfig,
  output: 'standalone',
}
