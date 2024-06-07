/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF8C00', // Orange
        secondary: '#6D6D6D', // Gray
        accent: '#000000', // Black
        background: '#FFFFFF' // White
      },
      spacing: {
        '30': '7.5rem',
      },
      borderRadius: {
        'md': '0.375rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
