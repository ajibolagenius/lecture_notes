// tailwind.config.js
// ============================================================
// Deejoft Coding School | React Native Course Starter
// NativeWind v4 — Tailwind CSS for React Native
// ============================================================
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './utils/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand:   '#e94560',
        dark:    '#1a1a2e',
        muted:   '#888899',
        surface: '#f8f8fc',
        border:  '#e2e2e8',
      },
      fontFamily: {
        sans: ['System'],
        mono: ['Courier'],
      },
    },
  },
  plugins: [],
}
