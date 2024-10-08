/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "cor-0": "var(--cor-0)",
        "cor-1": "var(--cor-1)",
        "cor-2": "var(--cor-2)",
        "cor-3": "var(--cor-3)",
        "cor-4": "var(--cor-4)",
        "cor-5": "var(--cor-5)",
        "cor-6": "var(--cor-6)",
        "cor-7": "var(--cor-7)",
        "cor-8": "var(--cor-8)",
        "cor-9": "var(--cor-9)",
        "cor-10": "var(--cor-10)",
        "cor-11": "var(--cor-11)",
        "cor-12": "var(--cor-12)",
        "cor-p1": "var(--cor-p1)",
        "cor-p2": "var(--cor-p2)",
        primary: "#ea580c",
        "primary-dark": "#9a3412",
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
