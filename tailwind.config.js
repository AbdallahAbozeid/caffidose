/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'coffee': '2px 2px 0px 0px transparent'
      },
    },
  },
  plugins: [],
}
