/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mymaths: {
          dark: "#002C51",
          light: "#A7D8EA",
          green: "#8CC63F",
          orange: "#F7941E",
          blue: "#0072BC",
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
