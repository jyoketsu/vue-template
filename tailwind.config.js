/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/@jyoketsu/vue-gantt/**/*.{vue,js,ts}",
  ],
  theme: {
    extend: {
      height: {
        "collapsed-menu-height": "calc(-118px + 100vh)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
