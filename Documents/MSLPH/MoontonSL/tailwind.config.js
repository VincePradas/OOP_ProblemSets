module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: [
      "./src/Components/Pages/About/**/*.{js,jsx,ts,tsx}",
      "./src/Components/Pages/opentournament_NEW/**/*.{js,jsx,ts,tsx}",
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        poetsen: ["Poetsen One", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
      },
      fontWeight: {
        "extra-light": 100,
        light: 300,
        regular: 400,
        medium: 500,
        "semi-bold": 600,
        bold: 700,
        "extra-bold": 800,
        black: 900,
      },
      keyframes: {
        slideInLeft: {
          "50%": { transform: "translateX(100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 100 },
        },
        slideInRight: {
          "50%": { transform: "translateX(100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 100 },
        },
        floating: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        slideInLeft: "slideInLeft .5s ease-out forwards",
        slideInRight: "slideInRight .5s ease-out forwards",
        floating: "floating 2s infinite",
      },
    },
  },
  screens: {
    sm: "740px",
    md: "1024",
    lg: "1242",
    xl: "1280px",
    "2xl": "1536px",
  },
  plugins: [require("@tailwindcss/typography")],
};
