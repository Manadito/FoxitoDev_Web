/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roundo: ["Roundo_Regular", "sans-serif"],
        arcadepixplus: ["Arcadepix_Plus", "sans-serif"],
        simplyrounded: ["Simply_Rounded", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 8px rgba(255, 255, 255, 0.5), 0 0 10px rgba(0, 0, 255, 0.5)", // Custom glow effect
      },
      colors: {
        customyellow: "rgba(255,218,86,255)",
        customOrange: "rgba(252,135,89,255)",
      },
    },
  },
  plugins: [],
};
