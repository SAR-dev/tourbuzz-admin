/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["IBM Plex Sans", "sans-serif"],
      body: ["IBM Plex Sans", "sans-serif"],
    },
  },
  plugins: [],
});
