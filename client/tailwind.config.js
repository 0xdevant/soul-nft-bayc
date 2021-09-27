// tailwind.config.js
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    maxWidth: {
      "1/4": "25%",
      "1/2": "50%",
      "2/3": "66.7%",
      "3/4": "75%",
      "4/5": "80%",
      "9/10": "90%",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
