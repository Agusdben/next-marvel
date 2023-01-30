/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.annihil.us']
  },
  env: {
    API_HASH: process.env.API_HASH,
    API_TS: process.env.API_TS,
    API_KEY: process.env.API_KEY,
    API_URL: process.env.API_URL
  }
}

module.exports = nextConfig
