const { version } = require('./package.json')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '',
        search: ''
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        search: ''
      }
    ]
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
  env: {
    APP_VERSION: version,
  }
}

module.exports = {
  ...nextConfig,
  output: 'standalone',
}
