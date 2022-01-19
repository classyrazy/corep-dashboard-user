module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pry: "#4471E3",
        "pry-dark": "#0C1825",
        sec: "#FCCA47",
      },
      fontFamily: {
        "ibmplex": ["IBM Plex Sans", "sans-serif"],
        "inter": ['Inter', "sans-serif"],
      },
    },
  },
  plugins: [],
}
