/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#A855F7",
        navy: "#1A0A2E",
        dark: "#0a0a0a",
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      borderRadius: {
        none: '0',
      },
      boxShadow: {
        none: 'none',
      },
    },
  },
  plugins: [],
}
