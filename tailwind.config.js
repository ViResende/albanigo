/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFF5E6",
        teal: "#3FB8AF",
        progress: "#E63946",
        splash: "#D94A4A",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // 👈 add here
      },
    },
  },
  plugins: [],
};
