/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-nunito)'],
      },
    },
    colors: {
      background: '#E8E8E8',
      max_red: '#FA0101',
      max_blue: '#2281F1',
      max_orange: '#FF9900',
      min_red: '#FF3333',
      min_blue: '#57A4FF',
      min_orange: '#FFB545'
    }
  },
  plugins: [],
}
