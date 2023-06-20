/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'lh3.googleusercontent.com', "images.clerk.dev"],
    },
    experimental: {
        serverActions: true,
      },
}

module.exports = nextConfig
