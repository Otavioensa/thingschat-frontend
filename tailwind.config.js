import tpg from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [tpg],
};

export default tailwindConfig;
