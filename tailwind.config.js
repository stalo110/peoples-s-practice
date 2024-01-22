/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js", 'node_modules/flowbite-react/lib/esm/**/*.js',],
  theme: {
    extend: {
      fontFamily: {
        mont: ["Montserrat", "sans-serif"],
      },
      zIndex: {
        '99999': '99999',
      }
    },
    screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    
    variants: {
      extend: {
        display: ['group-hover', 'group-focus', 'responsive'],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
