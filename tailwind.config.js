/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        coral: '#DA7D5F',
        sand: '#F5E6D9',
        ink: '#1A1A1A',
        cream: '#FAF7F2',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Crimson Pro', 'serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}