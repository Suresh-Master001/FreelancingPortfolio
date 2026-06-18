/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue:   '#00c2ff',
        violet: '#7c3aed',
        pink:   '#f72585',
        green:  '#06ffa5',
        bg:     '#030308',
        bg2:    '#07070f',
        card:   '#0d0d1a',
        border: '#1a1a2e',
        muted:  '#6b6b8a',
        light:  '#e8e8f0',
      },
      fontFamily: {
        head: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      animation: {
        'spin-slow':     'spin 6s linear infinite',
        'pulse-dot':     'pulsedot 2s infinite',
        'float':         'float 6s ease-in-out infinite',
        'float2':        'float 8s ease-in-out 1s infinite',
        'float3':        'float 7s ease-in-out 2s infinite',
        'scrolldown':    'scrolldown 2s infinite',
        'ring-pulse':    'ringpulse 3s ease-in-out infinite',
        'ring-pulse2':   'ringpulse 3s ease-in-out 0.5s infinite',
        'blink':         'blink 1s step-end infinite',
        'shimmer':       'shimmer 2s linear infinite',
        'conic-spin':    'spin 6s linear infinite',
      },
      keyframes: {
        pulsedot: {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%':     { opacity: '0.5', transform: 'scale(1.4)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-20px)' },
        },
        scrolldown: {
          '0%':   { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%':  { transform: 'scaleY(1)', transformOrigin: 'top' },
          '51%':  { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
        ringpulse: {
          '0%,100%': { opacity: '0.3' },
          '50%':     { opacity: '1' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
      },
      backgroundImage: {
        'gradient-blue-violet': 'linear-gradient(135deg, #00c2ff, #7c3aed)',
        'gradient-violet-pink': 'linear-gradient(135deg, #7c3aed, #f72585)',
        'gradient-hero':        'linear-gradient(135deg, #fff 0%, #00c2ff 50%, #7c3aed 100%)',
        'gradient-radial':      'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'neon-blue':   '0 0 30px rgba(0,194,255,0.3)',
        'neon-blue-lg':'0 0 50px rgba(0,194,255,0.5)',
        'neon-violet': '0 10px 30px rgba(124,58,237,0.4)',
        'card-hover':  '0 20px 60px rgba(0,194,255,0.1)',
        'pricing':     '0 0 40px rgba(0,194,255,0.1)',
      },
    },
  },
  plugins: [],
}
