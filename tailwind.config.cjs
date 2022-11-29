const colors = require("tailwindcss/colors");

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
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
