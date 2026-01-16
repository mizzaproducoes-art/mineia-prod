/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#020617", // Slate 950
        surface: "#0F172A",    // Slate 900
        primary: {
          DEFAULT: "#22D3EE", // Cyan 400
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },
        accent: {
          DEFAULT: "#A3E635", // Lime 400
          glow: "#BEF264",    // Lime 300
        },
        border: "#1E293B",    // Slate 800
      },
    },
  },
  plugins: [],
};
