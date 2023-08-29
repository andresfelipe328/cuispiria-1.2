import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: "#F7C66B",
        medium: "#FFEECB",
        dark: "#584A5A",
        extra: "#D26B65",
        success: "#56975A",
        error: "#C75A52",
        info: "#C3FCF2",
      },
      boxShadow: {
        s: "rgba(117, 101, 76, 0.12) 0px 1px 3px, rgba(117, 101, 76, 0.24) 0px 1px 2px",
        m: "rgba(32, 50, 93, 0.15) 0px 6px 12px -2px, rgba(32, 50, 93, 0.2) 0px 3px 7px -3px",
        l: "rgba(117, 101, 76, 0.25) 0px 13px 27px -5px, rgba(117, 101, 76, 0.3) 0px 8px 16px -8px",
      },
      screens: {
        animm: "700px",
      },
      backgroundImage: {
        "recipe-bg": "url('/background.svg')",
      },
    },
  },
  plugins: [],
};
export default config;
