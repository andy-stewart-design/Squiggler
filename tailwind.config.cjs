/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    fontFamily: {
      sans: ["Space Grot", ...defaultTheme.fontFamily.sans],
    },
    fontWeight: {
      regular: 350,
      medium: 450,
      bold: 550,
    },
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        brand: "#1761ff",
        accent: "#fa6a6a",
        black: "#020408",
        gray: {
          900: "#0d1116",
          800: "#161b22",
          700: "#22272e",
          600: "#353C45",
        },
      },
    },
  },

  plugins: [
    plugin(({ addVariant }) => {
      addVariant("g-dark", ":global(.dark) &");
      addVariant("blog", ".content &");
      addVariant("can-hover", "@media (hover: hover) {body &:hover}");
      addVariant("active", ".active&");
    }),
  ],
};

module.exports = config;
