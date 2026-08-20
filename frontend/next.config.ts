import type { NextConfig } from 'next'

const config = {
    output: 'export',
    reactCompiler: true,
    images: {
        unoptimized: true,
    },
    trailingSlash: true,
} satisfies NextConfig

export default config
