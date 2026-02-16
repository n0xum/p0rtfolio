/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactCompiler: true,
    images: {
        unoptimized: true,
    },
    basePath: '',
    trailingSlash: true,
}

module.exports = nextConfig
