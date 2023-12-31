/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {},
    screens: {
      'laptop': '1800px'
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui")
  ],
  daisyui: {
    themes: [
      "cupcake",
      "corporate",
      "retro",
      "cyberpunk",
      "halloween",
      "garden",
      "forest",
      "lofi",
      "black",
      "luxury",
      "business",
      "coffee",
      "winter",
      "dim",
      "sunset"
    ],
  }
};
