/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: {
          100: '#f7e9d7',
          200: '#e8c99a',
          300: '#d4a96a',
          400: '#c08a40',
          500: '#a67028',
        },
      },
    },
  },
  plugins: [],
};
