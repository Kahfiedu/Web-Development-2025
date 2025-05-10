/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}', // Pastikan untuk memproses semua file React
    ],
    theme: {
      extend: {
        colors: {
          'kahf-green': '#0D9F66', // Main green color from the design
        },
      },
    },
    plugins: [],
  };
  