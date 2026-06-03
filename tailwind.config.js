/** @type {import('tailwindcss').Config} */
export default {
  content: ["./card/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        porcelain: {
          50: "#fbf8f1",
          100: "#f5f0e7",
          200: "#ebe3d6",
          300: "#d8cbbb",
          700: "#665c50",
          900: "#171512",
        },
        charcoal: "#1d1b18",
        travertine: "#c9b9a4",
      },
      boxShadow: {
        card: "0 26px 80px rgba(29, 27, 24, 0.13)",
        button: "0 12px 28px rgba(29, 27, 24, 0.08)",
      },
    },
  },
  plugins: [],
};
