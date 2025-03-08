/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "public/*.{html,js}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    fontFamily: {
      // sans: ["Helvetica", "sans-serif"],
      sans: [
        "-apple-system",
        "system-ui",
        "BlinkMacSystemFont",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
    },
    extend: {
      colors: {
        primary: "#9966CC",
        secondary: "rgb(17, 151, 205)",
        complimentary: "rgb(4, 92, 130)",
      },
    },
  },
};
