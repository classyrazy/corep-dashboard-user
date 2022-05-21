// const colors = require("tailwindcss/colors");
// module.exports = {
//   mode: "jit",
//   content: [
//     "./assets/**/*.{vue,js,css}",
//     "./components/**/*.{vue,js}",
//     "./layouts/**/*.vue",
//     "./pages/**/*.vue",
//     "./plugins/**/*.{js,ts}",
//     "./nuxt.config.{js,ts}"
//   ], // or 'media' or 'class'
//   theme: {
//     extend: {},
//     colors: {
//       pry: "#4471E3",
//       "pry-dark": "#0C1825",
//       sec: "#FCCA47",
//     },
//     fontFamily: {
//       inter: ["Inter", "sans-serif"],
//     },
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [],
// };
module.exports = {
  purge: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  mode: "jit",
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        pry: "#4471E3",
        "pry-hover-light": "#567DDF",
        "pry-hover-dark": "#3B66D2",
        "pry-dark": "#0C1825",
        "pry-dark-hover-light": "#182838",
        // 212939
        "db-pry": "#2A3343",
        "db-pry-dark": "#212939",
        "db-pry-light": "#3B3F4D",
        "db-white": "#ffffff",
        "db-white-light": "#F9F9F9",
        "db-white-dark": "#eeeeee",
        "db-white-darker": "#eeeeee",
        sec: "#F9B700",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
