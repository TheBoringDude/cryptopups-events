const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: "425px",
      ...defaultTheme.screens,
    },
    colors,
    fontFamily: {
      sans: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      spacing: {
        90: "20rem",
        112: "28em",
        128: "32em",
        144: "36em",
        172: "46em",
        200: "56em",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
