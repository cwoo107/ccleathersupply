/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        parchment: {
          50:  '#fdfaf4',
          100: '#f9f2e3',
          200: '#f2e8d0',
          DEFAULT: '#f2e8d0',
        },
        oxblood: {
          light: '#8b3333',
          DEFAULT: '#6b1e1e',
          dark:  '#4a1515',
        },
        leather: {
          light: '#c09060',
          mid:   '#a87040',
          DEFAULT: '#8b5e3c',
          dark:  '#6b4423',
          deep:  '#4f2d10',
        },
        charcoal: {
          light: '#3d3730',
          DEFAULT: '#1d2430',
          dark:  '#0f0d0b',
        },
        gold: {
          light: '#e0c868',
          DEFAULT: '#c9a84c',
          dark:  '#9e7a2a',
        },
        slate: {
          ink: '#2c2825',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body:    ['"Crimson Pro"', 'Georgia', 'serif'],
        sans:    ['"Jost"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '7xl':  ['4.5rem',  { lineHeight: '1' }],
        '8xl':  ['6rem',    { lineHeight: '1' }],
        '9xl':  ['8rem',    { lineHeight: '0.9' }],
      },
      letterSpacing: {
        'widest-2': '0.25em',
        'widest-3': '0.35em',
      },
      borderColor: {
        'gold-subtle': 'rgba(201,168,76,0.3)',
      },
    },
  },
  plugins: [],
};
