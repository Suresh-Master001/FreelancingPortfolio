import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * About — Full bio, credentials grid, and animated stat counters.
 * Asymmetric layout: bio/credentials on left (wider), stats on right.
 */
export default function About({ about }) {
  const { ref: triggerRef, inView } = useInView({ threshold: 0.12, triggerOnce: true });

  const bio         = about?.bio         || '';
  const credibility = about?.credibility || [];

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  });

  return (
    <section id="about" ref={triggerRef} className="section-shell section-band">
      <div className="section-container">
        {/* ── Section header ── */}
        <motion.div {...fadeUp(0)} className="mb-4">
          <span className="section-kicker">{about?.kicker || 'About Me'}</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight tracking-tight mt-2">
            <span className="text-[color:var(--text-primary)]">Full Stack Developer & </span>
            <span className="gradient-text">AI Integration Specialist</span>
            <span className="text-[color:var(--text-primary)]"> - Building for Growth</span>
          </h2>
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left — bio + credentials (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <motion.p
              {...fadeUp(0.1)}
              className="text-[color:var(--text-secondary)] text-lg leading-relaxed"
            >
              {bio}
            </motion.p>

          </div>

          {/* Right — stats (5 cols) */}
          <div className="lg:col-span-5" aria-label="Key statistics">
            {/* Credentials as icon cards */}
            <motion.div
              {...fadeUp(0.2)}
              className="grid gap-4"
            >
              {credibility.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.25 + i * 0.08, duration: 0.5 }}
                    className="glass-card glass-card-glow p-4 flex items-start gap-3"
                  >
                    <span
                      className="mt-0.5 p-2 rounded-md flex-shrink-0"
                      style={{
                        background: 'rgba(77,184,255,0.08)',
                        border: '1px solid rgba(77,184,255,0.15)',
                      }}
                      aria-hidden="true"
                    >
                      <Icon size={16} className="text-[color:var(--accent-cyan)]" />
                    </span>
                    <span className="text-[color:var(--text-secondary)] text-sm leading-snug font-medium pt-1">
                      {item.label}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
      
    </section>
  );
}