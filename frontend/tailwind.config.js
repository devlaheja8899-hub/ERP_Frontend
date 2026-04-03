/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      boxShadow: {
        invoice: "0 15px 35px rgba(0,0,0,0.15)",
      },
      fontFamily: {
        invoice: ["Inter", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
}

