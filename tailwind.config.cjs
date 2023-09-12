/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-bg': "linear-gradient(180.36deg, rgba(255, 71, 11, .1) 74.08%, #8C2D29 100.09%),url('../src/assets/landing.png')",
        'auth-bg': "url('../src/assets/auth.png')",
      },
      colors: {
        'default':'#F5F5F8',
        'dark':'#000000',
        'primary':'#0d0a63'
      }, 
    },
  },
  plugins: [],
}