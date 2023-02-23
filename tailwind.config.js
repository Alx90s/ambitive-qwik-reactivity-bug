/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
        ginger: ["Ginger"],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: {
          DEFAULT: "var(--black)",
        },
        white: {
          DEFAULT: "var(--white)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
        },
        darkBlue: {
          DEFAULT: "var(--darkBlue)",
        },
        lightBlue: {
          DEFAULT: "var(--lightBlue)",
        },
        janseBlue: {
          DEFAULT: "var(--janseBlue)",
        },
        lightBlueCMS: {
          DEFAULT: "var(--lightBlueCMS)",
        },
        lightBlueOpCMS: {
          DEFAULT: "var(--lightBlueOpCMS)",
        },
        darkBlueCMS: {
          DEFAULT: "var(--darkBlueCMS)",
        },
        lightGrayCMS: {
          DEFAULT: "var(--lightGrayCMS)",
        },
        midGrayCMS: {
          DEFAULT: "var(--midGrayCMS)",
        },
        cookieToolCMS: {
          DEFAULT: "var(--cookieToolCMS)",
        },
      },
      screens: {
        c1: "1366px",
        c2: "1440px",
        c3: "1536px",
        c4: "1600px",
        c5: "1920px",
        c6: "2560px",
        c7: "3440px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
