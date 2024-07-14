import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'hsl(192, 100%, 67%) to hsl(280, 87%, 65%)',
      
      },
      colors:{
        'gradient-radial': 'hsl(192, 100%, 67%) to hsl(280, 87%, 65%)',
        gray: {
          50: 'hsl(0, 0%, 98%)',
          100: 'hsl(236, 33%, 92%)',
          200: 'hsl(233, 11%, 84%)',
          300: 'hsl(236, 9%, 61%)',
          400: 'hsl(235, 19%, 35%)',
          500: 'hsl(234, 39%, 85%)',
          600: 'hsl(220, 98%, 61%)',
          700: 'hsl(235, 21%, 11%)',
          800: 'hsl(235, 24%, 19%)',
          850: 'hsl(234, 11%, 52%)',
          900: 'hsl(233, 14%, 35%)',
          950: 'hsl(237, 14%, 26%)',
        },
      },
    },
  },
  plugins: [],
}
export default config
