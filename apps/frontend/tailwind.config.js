// eslint-disable-next-line import/no-extraneous-dependencies
const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D8B4FE', // purple
        secondary: '#FDFE47', // yellow
        accent1: '#F9A8D4', // pink
        primeaccent: '#F9A8D4', // pink
      },
    },
  },
  plugins: [],
};
