/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#2E6280",
        primaryLight: "#43728d",
        contrast: "#BC0F1E",
        secondary: "#EDC579",
        secondaryDark: "#DDAC47",
        contrastDark: "#421C1A",
        grey: "#575450",
        primaryDark: "#0A4E65",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        custom: {
          primary: "#2E6280",
          secondary: "#EDC579",
          accent: "#BC0F1E",
          neutral: "#575450",
          "base-100": "#FFFFFF",
          "base-200": "#F1F5F9",
          "base-300": "#E2E8F0",
          "base-content": "#000000",
        },
      },
    ],
  },
};
