/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {colors: {
        border: "var(--border-color)",
        background: "var(--background-color)",
        text: "var(--text-color)",
      },},
  },
  plugins: [],
}