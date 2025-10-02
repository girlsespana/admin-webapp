import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['\'Outfit Variable\'', 'sans-serif'],
      },
    },
  },
} satisfies Config