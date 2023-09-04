const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(
        __dirname,
        '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        custom_primary: '#0E21A0',
        custom_secondary: '#4D2DB7',
        custom_loading: '#9D44C0',
        custom_light: '#EC53B0',
        custom_dark:'#001C30',
        custom_dark_secondary:'#00101c',
        custom_primary_dark:'#080202',
        custom_button:'#1B6B93',
        custom_ocean:'#213555',
        custom_danger:'#8a1d36',
        custom_disabled:'#c5c5c5',
        // Add more custom colors here
      },
    },
  },
  plugins: [
    require('tailwindcss-transforms'),
    require('tailwindcss-transitions'),
    require('flowbite/plugin')
  ],
};