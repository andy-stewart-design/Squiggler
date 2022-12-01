/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    fontFamily: {
      sans: ["Space Grot", ...defaultTheme.fontFamily.sans],
    },
    fontWeight: {
      medium: 450,
    },
    extend: {
      colors: {
        brand: colors.blue[600],
        accent: "#fa6a6a",
        black: "#020408",
        gray: {
          900: "#0d1116",
          800: "#161b22",
          700: "#22272e",
        },
      },
    },
  },

  plugins: [],
};

module.exports = config;
