/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-nunito)'],
      },
      gridTemplateAreas: {
        'wide': [
          'stats cover family',
        ],
        'medium': [
          'cover family family',
          'stats stats stats'
        ],
        'slim': [
          'cover',
          'stats',
          'family',
        ],
      },
      gridTemplateColumns: {
        'layout': '1fr 1fr 1fr',
      },
    },
    colors: {
      background: '#E8E8E8',
      max_red: '#FA0101',
      max_white: '#DADADA',
      min_white: '#D0D0D0',
      max_lightblue: '#1DD1E9',
      min_lightblue: '#43E9FF',
      max_blue: '#2281F1',
      max_orange: '#FF9900',
      max_green: '#2FE74C',
      min_green: '#48FF65',
      max_cyan: '#0BD498',
      min_cyan: '#1DF2B3',
      max_purple: '#481A92',
      min_purple: '#5E33A4',
      min_red: '#FF3333',
      min_blue: '#57A4FF',
      min_orange: '#FFB545',
      black_900: '#313131',
      gray_500: '#D9D9D9',
      fire1: '#FF5C00',
      fire2: '#FF8945',
      dark1: '#000',
      dark2: '#343153',
      grass1: '#00B61D',
      normall: '#0DAABF',
      normal2: '#17D2EA',
      grass2: '#00DB23',
      bug1: '#15A67B',
      bug2: '#60FBCD',
      water1: '#0F55A8',
      water2: '#AED3FF',
      white: '#fafafa',
      gray_700: '#9F9F9F',
      max_ice: "#7ED8FF",
      min_ice: '#AAE6FF',
      max_steel: '#B3B3B3',
      min_steel: '#CFCFCF',
      max_rock: '#827B7B',
      min_rock: '#978C8C',
      max_eletric: '#F2CC05',
      min_eletric: '#FFE043',
      max_ground: '#854507',
      min_ground: '#BA6722',
      max_fairy: '#FF398C',
      min_fairy: '#FF60A2',
      max_ghost: '#575479',
      min_ghost: '#7171A0',
      max_fighting: '#B48E65',
      min_fighting: '#E1B587',
      fighting1: '#AE8050',
      fighting2: '#DBB289',
      max_dark: '#252431',
      min_dark: '#343153',
      max_psychic: '#810097',
      min_psychic: '#AE36C1',
      ghost1: '#323045',
      ghost2: '#60609A',
      ice1: '#4C9BBD',
      ice2: '#82CAE8',
      fairy1: '#CB0256',
      fairy2: '#FF4793',
      psychic1: '#510E5C',
      psychic2: '#810097',
      min_dragon: '#1DD077',
      max_dragon: '#058C43'
    }
  },
  plugins: [
    require('@savvywombat/tailwindcss-grid-areas'),
  ],
  variants: {
    gridTemplateAreas: ['responsive']
  }
}

//d58103
