/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                brand: '#e94560',
                dark: '#1a1a2e',
                muted: '#888899',
                surface: '#f8f8fc',
            },
            fontFamily: {
                sans: ['Inter_400Regular'],
                bold: ['Inter_700Bold'],
            },
        },
    },
    plugins: [],
}
