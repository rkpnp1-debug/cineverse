import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cinema: { 400: "#ea867b", 500: "#dc5f52", 600: "#c94336", 700: "#a8352b" },
        surface: { 900: "#0a0a0b", 800: "#121214", 700: "#1a1a1e", 600: "#242428" },
      },
    },
  },
  plugins: [],
};
export default config;
