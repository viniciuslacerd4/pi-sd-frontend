/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "bzd-orange-light": "#f09819",
        "bzd-orange": "#fe6501",
        "bzd-orange-dark": "#831b0b",
        "bzd-white": "#ffffff",
        "bzd-gray": "#f1eded",
        "bzd-black": "#000000",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        kulim: ["Kulim Park", "sans-serif"],
      },
      fontSize: {},
    },
  },
  plugins: [],
};
