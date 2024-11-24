 /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // keyframes: {
      //   slide: {
      //     '0%': {
      //       backgroundImage: "url('/laptop.jpeg')",
      //       backgroundPosition: '100% 0%',
      //     },
      //     '33%': {
      //       backgroundImage: "url('/monitor.jpeg')",
      //       backgroundPosition: '75% 0%',
      //     },
      //     '66%': {
      //       backgroundImage: "url('/social-message.jpeg')",
      //       backgroundPosition: '50% 0%',
      //     },
      //     '100%': {
      //       backgroundImage: "url('/tablate.jpg')",
      //       backgroundPosition: '0% 0%',
      //     },
      //   },
      // },
      // animation: {
      //   background: 'slide 10s   infinite',
      // },
    },
  },
  plugins: [],
};
