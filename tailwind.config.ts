import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      xsm: "360px",
      xs: "476px",
      // xs: "425px",
      sm: "640px",
      md: "768px",
      bs: "900px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1550px",

      "2xl-mx": { max: "1535px" },
      "xl-mx": { max: "1279px" },
      "lg-mx": { max: "1023px" },
      "bs-mx": { max: "899px" },
      "md-mx": { max: "767px" },
      "sm-mx": { max: "639px" },
      "xs-mx": { max: "475px" },
      "xsm-mx": { max: "349px" },
    },
    extend: {
      fontFamily: {
        kanit: ["var(--font-kanit)"],
      },
      colors: {
        primary: "#9747FF",
        "light-primary-txt": "#04091E",
        "light-secondary-txt": "#747681",
        "dark-primary-txt": "#fdfeff",
        "dark-secondary-txt": "#a9adb8",
        "dark-bg-primary": "#070D1B",
        "dark-bg-secondary": "#0A101E",
      },
      // backgroundImage: {
      //   'light-bg': "url('')",
      //   'dark-bg': "url('/dark-mode-image.jpg')",
      // }
    },
  },
  // plugins: [require("tailwindcss-animate")],
} satisfies Config;
