/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lora: ["Lora", "sans"],
      },
      width: {
        120: "120px",
      },
      colors: {
        raisinBlack : "#2E282A",
        flame: "#E4572E",
        kellygris: "#76B041",
        jonquil: "#FFC914",
      },
    },
  },
  plugins: [],
}

