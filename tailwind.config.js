export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#A2626A',
          hover: '#8E5258',
          light: '#B9787D',
          soft: '#F6E9E8',
          pale: '#FBF5F4',
        },
        sage: { DEFAULT: '#879486', soft: '#EEF1EC', dark: '#5E6B5D' },
        ink: { DEFAULT: '#242326', 2: '#5F5D61', muted: '#77747A' },
        surface: '#FAF9F8',
        product: '#F6F1EF',
        line: '#EAE6E4',
        success: { DEFAULT: '#397653', soft: '#E9F2EC' },
        warning: { DEFAULT: '#A96A19', soft: '#F8EFE2' },
        error: { DEFAULT: '#B43D42', soft: '#F8E8E8' },
        info: { DEFAULT: '#356C91', soft: '#E7F0F6' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      maxWidth: {
        container: '1320px',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
  plugins: [],
}
