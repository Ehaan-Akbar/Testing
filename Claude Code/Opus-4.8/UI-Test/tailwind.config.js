/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Surfaces
        canvas: '#08080b',      // page background
        panel: '#0e0e13',       // outer rounded panel
        card: '#15151b',        // standard card surface
        'card-2': '#1a1a21',    // slightly raised surface (inputs, pills)
        line: '#26262e',        // hairline borders
        // Accent
        accent: '#7c5cff',
        'accent-soft': '#8b6dff',
        // Text
        ink: '#f5f5f7',
        'ink-muted': '#a1a1aa',
        'ink-dim': '#6b6b76',
      },
      borderRadius: {
        xl2: '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        card: '0 1px 0 0 rgba(255,255,255,0.03) inset, 0 8px 24px -12px rgba(0,0,0,0.6)',
        accent: '0 8px 20px -6px rgba(124,92,255,0.55)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
