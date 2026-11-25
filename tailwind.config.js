export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      /*
       * Cardamom Luxury colour system — the single source of truth for UI colour.
       * Distribution: 60% ivory/light neutrals · 20% warm sand · 15% cardamom green · 5% champagne/sage.
       * Contrast notes (WCAG AA, 4.5:1 for body text):
       *   - gold / sage DEFAULT are decorative only — use gold.text / sage.dark for small text.
       *   - ink.muted is #6A6D63 (spec #72756B measured 4.34:1 on ivory, below AA).
       */
      colors: {
        // Cardamom Green — primary brand colour
        brand: {
          DEFAULT: '#343F32',
          hover: '#263024',
          light: '#78866B',
          soft: '#E8ECE5', // primary light — secondary-button hover, selected states
          pale: '#F0EDE5', // subtle background
        },
        // Muted Champagne — accent (≤5%); gold.text passes AA on ivory/white
        gold: { DEFAULT: '#B39768', soft: '#EDE4D5', text: '#7A643F' },
        // Botanical Sage — secondary / decorative surfaces
        sage: { DEFAULT: '#78866B', soft: '#E8ECE5', dark: '#56634C' },
        // Text
        // ink.sand = secondary text on Warm Sand (AA 5.2:1)
        ink: { DEFAULT: '#242820', 2: '#65685F', muted: '#6A6D63', sand: '#55584F' },
        // Backgrounds & surfaces
        ivory: '#F8F6F0', // main background
        sand: '#E3DACB', // alternative background
        surface: '#F0EDE5', // subtle background
        product: '#FFFFFF', // product cards & imagery wells
        // Borders & dividers
        line: { DEFAULT: '#DCDDD4', subtle: '#E8E5DC', input: '#A0A498' },
        // Functional
        sale: { DEFAULT: '#963E40', hover: '#7E3335', soft: '#F6EAE8' },
        success: { DEFAULT: '#3D704D', soft: '#E7F0EA' },
        warning: { DEFAULT: '#94651F', soft: '#F5EDE0' },
        error: { DEFAULT: '#A13D3D', soft: '#F7E9E9' },
        info: { DEFAULT: '#426779', soft: '#E6EEF1' },
        disabled: { DEFAULT: '#E8E8E2', text: '#777A71' },
        // Expressive supporting pastels — category cards, campaigns, promo bands.
        // All pass AA with ink / brand text (≥ 8:1); never use them as text colours.
        pastel: {
          rose: '#E8C4C5', // Dusty Rose
          peach: '#EBC2A5', // Soft Peach
          pistachio: '#D8DFBD', // Pistachio
          lavender: '#DCD3E9', // Lavender Mist
          butter: '#EBDCA9', // Butter Yellow
        },
      },
      fontFamily: {
        /*
         * Typography tokens
         *   Primary   — Canela        (licensed, /public/fonts/canela/)
         *   Secondary — Suisse Int'l  (licensed, /public/fonts/suisse-intl/)
         * Until the licensed WOFF2 files are added, browsers render the clearly-separate
         * temporary fallbacks listed after them (Cormorant Garamond / Inter).
         */
        sans: ['"Suisse Intl"', 'Inter', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        display: ['Canela', '"Cormorant Garamond"', 'Georgia', 'serif'],
        // `font-serif` (used by the in-site admin pages) also maps to the primary font
        serif: ['Canela', '"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      // Only Regular (400) and Medium (500) are used for UI text — heavier weights resolve to Medium
      fontWeight: {
        semibold: '500',
        bold: '500',
        extrabold: '500',
        black: '500',
      },
      // Responsive type scale (mobile → desktop via clamp)
      fontSize: {
        // Canela
        'display-hero': ['clamp(3rem, 1.6rem + 5.2vw, 6rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }], // 48 → 96
        'display-page': ['clamp(2.5rem, 1.75rem + 2.4vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }], // 40 → 64
        'display-section': ['clamp(2rem, 1.6rem + 1.4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }], // 32 → 48
        'display-category': ['clamp(1.5rem, 1.3rem + 0.7vw, 2rem)', { lineHeight: '1.15', letterSpacing: '-0.005em' }], // 24 → 32
        // Suisse Int'l
        'ui-nav': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }], // 14px, ~0.35px tracking
        'ui-button': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.06em' }], // 14
        'ui-product': ['1rem', { lineHeight: '1.4' }], // 16
        'ui-body': ['clamp(0.875rem, 0.84rem + 0.15vw, 1rem)', { lineHeight: '1.65' }], // 14 → 16
        'ui-label': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.12em' }], // 12
      },
      // Unqualified `border` uses the default divider colour
      borderColor: {
        DEFAULT: '#DCDDD4',
      },
      maxWidth: {
        container: '1360px',
      },
      height: {
        18: '4.5rem',
      },
      boxShadow: {
        // Light, green-tinted shadows (no heavy drop shadows)
        soft: '0 1px 2px rgba(36,40,32,0.04), 0 8px 24px -14px rgba(36,40,32,0.10)',
        lift: '0 2px 4px rgba(36,40,32,0.04), 0 20px 40px -24px rgba(36,40,32,0.16)',
        '2xs': '0 1px 1px rgba(36,40,32,0.05)',
      },
      letterSpacing: {
        luxe: '0.16em',
      },
      // Motion tokens (mirrored in src/config/motion.ts for framer-motion)
      transitionTimingFunction: {
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        fast: '200ms',
        base: '350ms',
        slow: '700ms',
      },
      keyframes: {
        'marquee-x': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        progress: { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
        'heart-pop': { '0%': { transform: 'scale(1)' }, '40%': { transform: 'scale(1.28)' }, '100%': { transform: 'scale(1)' } },
      },
      animation: {
        'marquee-slow': 'marquee-x 45s linear infinite',
        'marquee-fast': 'marquee-x 28s linear infinite',
        'heart-pop': 'heart-pop 380ms cubic-bezier(0.22, 1, 0.36, 1)',
        // duration is set inline per use (e.g. hero slide length)
        progress: 'progress 6s linear forwards',
      },
    },
  },
  plugins: [],
}
