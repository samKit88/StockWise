/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        customOne: '#433B5C', // Your custom color
      },
    },
  },
  plugins: [],
}
