/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      body: ["Inter", "sans-serif"],
    },
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: ["black", "dark", "retro", "cyberpunk", "valentine", "aqua", "light"],
  }
};
