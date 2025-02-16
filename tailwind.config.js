/** @type {import('tailwindcss').Config} */
export default {
  // dissable tailwind reset css
  corePlugins: {
    preflight: false, // Disable Tailwind's reset
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

