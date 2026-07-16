# Codenxte - Freelancer/Agency Portfolio

A visually stunning, high-performance portfolio website built with modern web technologies.

## Tech Stack

- **Vite + React** - Fast build tool with functional components and hooks
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Three.js** (@react-three/fiber + @react-three/drei) - 3D visuals and animations
- **Framer Motion** - UI animations and transitions
- **GSAP + ScrollTrigger** - Scroll-based storytelling

## Design Features

### Visual Design
- Dark theme base (#0a0a0f) with electric blue/violet gradient accents
- Glassmorphism cards with frosted glass effect and soft glow on hover
- Large, confident typography with variable font weights
- Asymmetric grid layouts for modern feel

### 3D Hero Section
- Full-viewport Three.js scene with floating distorted icosahedron
- Mouse movement parallax effect
- Subtle auto-rotation animation
- MeshDistortMaterial for "liquid glass" look
- Lazy-loaded with Suspense and static gradient fallback

### Sections
1. **Navbar** - Sticky navigation with blur on scroll, mobile hamburger menu
2. **Hero** - 3D animated headline with staggered text reveal
3. **Services** - Grid of cards with icon hover animations
4. **Process** - Horizontal timeline with GSAP scroll-linked progress
5. **Tech Stack** - Animated marquee of technology logos
6. **About** - Bio section with animated stat counters
7. **Projects** - Featured work with 3D tilt-on-hover effect
8. **Testimonials** - Carousel with 3D card flip transitions
9. **Contact** - Glassmorphic form with social links

## Performance Optimizations

- React.lazy + Suspense for code-splitting heavy 3D components
- Capped pixel ratio on Three.js canvas (1.8 desktop, 1.2 mobile)
- Reduced geometry complexity on mobile devices
- Respects `prefers-reduced-motion` for accessibility
- Proper resource disposal on component unmount

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx     # Navigation with smooth scroll
│   ├── Hero.jsx       # Hero with 3D scene
│   ├── Services.jsx   # Services grid
│   ├── About.jsx      # About with animated stats
│   ├── Process.jsx    # Timeline with GSAP
│   ├── TechStack.jsx  # Tech marquee
│   ├── Portfolio.jsx  # Project cards
│   ├── Testimonials.jsx # Testimonial carousel
│   ├── Contact.jsx    # Contact form
│   └── Footer.jsx     # Footer
├── hooks/
│   ├── useReducedMotion.js # Motion preference hook
│   └── useIsomorphicLayoutEffect.js # SSR-safe effect hook
├── three/
│   └── HeroScene.jsx  # Three.js scene component
├── data.js            # Content data (easy to edit)
├── App.jsx            # Main app component
└── index.css          # Global styles
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Customization

All content is stored in `src/data.js` for easy editing:
- Personal info and contact details
- Services offered
- Featured projects with tech stacks
- Testimonials
- Process steps

## License

MIT