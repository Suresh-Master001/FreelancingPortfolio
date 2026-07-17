import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { techStackDots } from '../data';


/**
 * TechStack — Dual-row marquee (one left, one right) with color dots.
 * Falls back to a grid on mobile.
 * Marquee pauses on hover for readability.
 */
export default function TechStack({ techStack: techProp }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const tech = techProp || [];

  const allTech = tech;


  // Split into two rows, interleaved
  const row1 = allTech.filter((_, i) => i % 2 === 0);
  const row2 = allTech.filter((_, i) => i % 2 === 1);

  const TechBadge = ({ item }) => {
    const Icon = item.icon;
    const dot  = techStackDots[item.name];

    return (
      <div className="tech-item">
        {dot ? (
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: dot, boxShadow: `0 0 6px ${dot}88` }}
            aria-hidden="true"
          />
        ) : Icon ? (
          <Icon size={16} className="text-[color:var(--accent-blue)] flex-shrink-0" aria-hidden="true" />
        ) : null}
        {item.name}
      </div>
    );
  };

  return (
    <section id="tech-stack" ref={ref} className="section-shell">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <span className="section-kicker mx-auto">Tech Stack</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mt-2">
            <span className="text-[color:var(--text-primary)]">Technologies</span>
            <span className="gradient-text"> We Master</span>
          </h2>
          <p className="text-[color:var(--text-secondary)] mt-4 max-w-2xl mx-auto">
            Modern tooling and frameworks that power fast, scalable, and beautiful applications.
            From React and Node.js to WordPress and AI APIs — I work across the full stack to deliver complete solutions.
          </p>
        </motion.div>

        {/* ── Desktop: dual marquee ── */}
        <div className="hidden md:flex flex-col gap-4">
          {/* Row 1 — scrolls left */}
          <div className="marquee-outer">
            <div className="marquee-track marquee-track-forward">
              {[...row1, ...row1].map((item, idx) => (
                <TechBadge key={`r1-${idx}`} item={item} />
              ))}
            </div>
          </div>
          {/* Row 2 — scrolls right */}
          <div className="marquee-outer">
            <div className="marquee-track marquee-track-backward">
              {[...row2, ...row2].map((item, idx) => (
                <TechBadge key={`r2-${idx}`} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Mobile: static grid ── */}
        <div className="md:hidden grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {allTech.map(item => (
            <TechBadge key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}