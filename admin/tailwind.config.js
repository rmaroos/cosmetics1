export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#9F2438', // Deep Burgundy primary
          hover: '#831b2c',
          light: '#C43D50', // Burgundy Accent
          soft: '#FBF0F2',
          pale: '#FFF5F6',
        },
        sage: { DEFAULT: '#879486', soft: '#EEF1EC', dark: '#5E6B5D' },
        ink: { DEFAULT: '#171717', 2: '#5F5D61', muted: '#777777' },
        surface: '#FAF9F8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
