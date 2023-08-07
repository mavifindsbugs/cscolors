/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {screens: {
        standalone: { raw: "(display-mode: standalone)" },
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode: 'class'
}

