/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.ts'],
  presets: [require('nativewind/preset')],
  theme: {
    colors: {
      primary: '#DA5534',
      sub1: '#DC6E3F',
      sub2: '#FF8A65',
      g1: '#60594E',
      g2: '#847C70',
      g3: '#F0EDE6',
      g4: '#F7F6F2',
      g5: '#AEA79C',
      g6: '#E5E2DB',
      black: '#343434',
      white: '#FEFDFA',
    },
    extend: {
      boxShadow: {
        header: '0px 8px 20px rgba(132, 124, 112, 0.1)',
      },
    },
  },
  plugins: [],
};
