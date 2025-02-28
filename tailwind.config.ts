import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customRed: "var(--primary-color)", // Custom primary color added
      },
      //added new
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"], // Add this
      },
    },
  },
  plugins: [],
} satisfies Config;
