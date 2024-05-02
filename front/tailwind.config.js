/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "arrow-turn": "arrow-turn 1s linear",
      },
      keyframes: {
        "arrow-turn": {
          "0%": { transform: "rotate(0)" },
          "100%": { transform: "rotate(-90deg)" },
        },
      },
    },
  },
  plugins: [],
};
