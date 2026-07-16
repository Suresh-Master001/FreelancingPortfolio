/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent-blue':   '#4db8ff',
        'accent-cyan':   '#00f5d4',
        'accent-violet': '#8b5cf6',
        'accent-purple': '#a855f7',
        'accent-pink':   '#f472b6',
        'accent-gold':   '#fbbf24',
        'bg-primary':    '#050508',
        'bg-secondary':  '#0a0a10',
        'bg-tertiary':   '#0f0f18',
        'text-primary':  '#f0f4ff',
        'text-secondary':'#8a9bbf',
        'text-tertiary': '#4f5d7a',
        'success':       '#10b981',
        'glass-border':  'rgba(200,215,255,0.09)',
      },
      fontFamily: {
        head: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        'spin-slow':      'spin 8s linear infinite',
        'spin-reverse':   'spinReverse 12s linear infinite',
        'float':          'float 7s ease-in-out infinite',
        'float-slow':     'float 12s ease-in-out infinite',
        'orb-1':          'orbFloat1 14s ease-in-out infinite',
        'orb-2':          'orbFloat2 18s ease-in-out infinite',
        'status-pulse':   'statusPulse 2.4s ease-in-out infinite',
        'ring-rotate':    'ringRotate 6s linear infinite',
        'marquee-left':   'marqueeLeft 35s linear infinite',
        'marquee-right':  'marqueeRight 40s linear infinite',
        'scroll-bounce':  'scrollBounce 2.5s ease-in-out infinite',
        'glow-pulse':     'glowPulse 3s ease-in-out infinite',
        'shimmer':        'shimmer 2.5s linear infinite',
        'fade-up':        'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        spinReverse: { to: { transform: 'rotate(-360deg)' } },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-18px)' },
        },
        orbFloat1: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(30px,-20px) scale(1.05)' },
          '66%':     { transform: 'translate(-20px,15px) scale(0.97)' },
        },
        orbFloat2: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '50%':     { transform: 'translate(-40px,30px) scale(1.08)' },
        },
        statusPulse: {
          '0%,100%': { opacity:'1', transform:'scale(1)' },
          '50%':     { opacity:'0.7', transform:'scale(1.3)' },
        },
        ringRotate: { to: { transform: 'rotate(360deg)' } },
        marqueeLeft:  { from: { transform:'translateX(0)' },    to: { transform:'translateX(-50%)' } },
        marqueeRight: { from: { transform:'translateX(-50%)' }, to: { transform:'translateX(0)' } },
        scrollBounce: {
          '0%,100%': { transform:'translateX(-50%) translateY(0)',  opacity:'0.5' },
          '50%':     { transform:'translateX(-50%) translateY(8px)', opacity:'1' },
        },
        glowPulse: {
          '0%,100%': { opacity:'0.4', transform:'scale(1)' },
          '50%':     { opacity:'0.8', transform:'scale(1.1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
        fadeUp: {
          from: { opacity:'0', transform:'translateY(24px)' },
          to:   { opacity:'1', transform:'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-blue-cyan':   'linear-gradient(135deg, #4db8ff, #00f5d4)',
        'gradient-cyan-violet': 'linear-gradient(135deg, #00f5d4, #8b5cf6)',
        'gradient-hero':        'linear-gradient(135deg, #f0f4ff 0%, #4db8ff 40%, #00f5d4 70%, #8b5cf6 100%)',
        'gradient-radial':      'radial-gradient(var(--tw-gradient-stops))',
        'conic-glow':           'conic-gradient(from 0deg, #00f5d4, #4db8ff, #8b5cf6, #00f5d4)',
      },
      boxShadow: {
        'glow-blue':    '0 0 24px rgba(77,184,255,0.3)',
        'glow-cyan':    '0 0 24px rgba(0,245,212,0.3)',
        'glow-violet':  '0 0 24px rgba(139,92,246,0.35)',
        'glow-pink':    '0 0 24px rgba(244,114,182,0.3)',
        'card-hover':   '0 20px 60px rgba(0,0,0,0.4)',
        'neon-strong':  '0 0 40px rgba(77,184,255,0.4), 0 0 80px rgba(77,184,255,0.15)',
      },
    },
  },
  plugins: [],
}
