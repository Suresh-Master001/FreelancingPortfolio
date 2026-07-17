import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Testimonials — Auto-rotating carousel with 3D card-flip transitions.
 * Shows all three cards side-by-side on large screens with the active one elevated.
 * On mobile, shows one at a time with prev/next controls.
 */
export default function Testimonials({ testimonials: testimonialsProp }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const testimonials = testimonialsProp || [];

  // Auto-advance carousel
  useEffect(() => {
    if (testimonials.length <= 1 || paused) return;
    const id = setInterval(() => setActive(a => (a + 1) % testimonials.length), 5500);
    return () => clearInterval(id);
  }, [testimonials.length, paused]);

  const prev = () => setActive(a => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive(a => (a + 1) % testimonials.length);

  const cardVariants = {
    enter:  { opacity: 0, rotateY: -35, scale: 0.92 },
    center: { opacity: 1, rotateY: 0,   scale: 1,   transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit:   { opacity: 0, rotateY: 35,  scale: 0.92, transition: { duration: 0.4 } },
  };

  return (
    <section
      id="testimonials"
      ref={ref}
      className="section-shell"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Client testimonials"
    >
      <div className="section-container">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <span className="section-kicker mx-auto">Testimonials</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mt-2">
            <span className="text-[color:var(--text-primary)]">What clients</span>
            <span className="gradient-text"> say</span>
          </h2>
          <p className="text-[color:var(--text-secondary)] mt-4 max-w-2xl mx-auto">
            Real feedback from founders and businesses I've helped grow through technology.
            Consistently rated 5-stars for code quality, communication and on-time delivery.
          </p>
        </motion.div>

        {/* ── Desktop: all-visible 3-column ── */}
        <div className="hidden lg:grid grid-cols-3 gap-5">
          {testimonials.map((t, i) => {
            const isActive = i === active;
            return (
              <motion.button
                key={t.id}
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                aria-label={`Testimonial from ${t.name}`}
                className={`glass-card relative p-7 flex flex-col text-left cursor-pointer transition-all duration-400 ${
                  isActive
                    ? 'border-[color:var(--border-glass-mid)] shadow-[0_20px_60px_rgba(0,0,0,0.5)]'
                    : 'opacity-60 hover:opacity-80'
                }`}
                style={isActive ? { transform: 'translateY(-8px)' } : {}}
              >
                {/* Quote mark */}
                <span className="testimonial-quote" aria-hidden="true">"</span>

                {/* Stars */}
                <div className="flex gap-1 mb-4 relative z-10" aria-label={`${t.rating || 5} out of 5 stars`}>
                  {[...Array(t.rating || 5)].map((_, si) => (
                    <Star
                      key={si}
                      size={14}
                      aria-hidden="true"
                      className="fill-[#fbbf24] text-[#fbbf24]"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[color:var(--text-secondary)] leading-relaxed mb-6 flex-grow text-sm relative z-10">
                  "{t.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 relative z-10">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{
                      background: 'conic-gradient(from 0deg, #00f5d4, #4db8ff, #8b5cf6)',
                      color: '#050508',
                    }}
                    aria-hidden="true"
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-[color:var(--text-primary)] text-sm">
                      {t.name}
                    </h4>
                    <p className="text-[color:var(--text-tertiary)] text-xs">{t.role}</p>
                  </div>
                </div>

                {/* Active indicator strip */}
                {isActive && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-lg"
                    style={{ background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-blue))' }}
                    aria-hidden="true"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* ── Mobile: one-at-a-time carousel ── */}
        <div className="lg:hidden">
          <div
            className="relative overflow-hidden"
            style={{ perspective: '1200px' }}
          >
            <AnimatePresence mode="wait">
              {testimonials.map((t, i) => {
                if (i !== active) return null;
                return (
                  <motion.div
                    key={t.id}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="glass-card relative p-7"
                  >
                    <span className="testimonial-quote" aria-hidden="true">"</span>

                    <div className="flex gap-1 mb-4" aria-label={`${t.rating || 5} out of 5 stars`}>
                      {[...Array(t.rating || 5)].map((_, si) => (
                        <Star key={si} size={14} className="fill-[#fbbf24] text-[#fbbf24]" aria-hidden="true" />
                      ))}
                    </div>

                    <p className="text-[color:var(--text-secondary)] leading-relaxed mb-6 text-base">
                      "{t.content}"
                    </p>

                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                        style={{ background: 'conic-gradient(from 0deg, #00f5d4, #4db8ff, #8b5cf6)', color: '#050508' }}
                        aria-hidden="true"
                      >
                        {t.avatar}
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-[color:var(--text-primary)]">{t.name}</h4>
                        <p className="text-[color:var(--text-tertiary)] text-sm">{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="icon-button"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>

            <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                  className={`testimonial-dot ${i === active ? 'active' : ''}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="icon-button"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Desktop dot nav */}
        <div className="hidden lg:flex justify-center gap-2 mt-8" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`testimonial-dot ${i === active ? 'active' : ''}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}