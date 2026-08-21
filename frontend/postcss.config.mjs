/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: {
        // Tailwind v4's PostCSS plugin runs on Lightning CSS, which already
        // handles vendor prefixing and minification in one pass - the v3-era
        // autoprefixer + cssnano chain is redundant and has been removed.
        '@tailwindcss/postcss': {},
    },
};

export default config;
