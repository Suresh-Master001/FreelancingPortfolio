import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight } from 'lucide-react';

// Per-service accent colors and gradient overlays for the header area
const serviceThemes = [
  { num: '01', accent: '#4db8ff', glow: 'rgba(77,184,255,0.15)',  gradient: 'from-blue-500/10 to-transparent' },
  { num: '02', accent: '#00f5d4', glow: 'rgba(0,245,212,0.15)',   gradient: 'from-cyan-400/10 to-transparent' },
  { num: '03', accent: '#8b5cf6', glow: 'rgba(139,92,246,0.15)',  gradient: 'from-violet-500/10 to-transparent' },
  { num: '04', accent: '#f472b6', glow: 'rgba(244,114,182,0.15)', gradient: 'from-pink-400/10 to-transparent' },
];

/**
 * Services — 2×2 grid of premium numbered service cards.
 * Each card has a large decorative number, animated icon, point list, and CTA.
 */
export default function Services({ services: servicesProp }) {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });
  const services = servicesProp || [];

  return (
    <section id="services" ref={ref} className="section-shell">
      <div className="section-container">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="section-kicker">Services</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight tracking-tight mt-2">
            <span className="text-[color:var(--text-primary)]">Premium software services</span>
            <br />
            <span className="gradient-text">for serious growth</span>
          </h2>
          <p className="text-[color:var(--text-secondary)] mt-5 max-w-2xl text-lg">
            Professional WordPress websites, full-stack MERN applications, SaaS platforms and AI-powered solutions
            - built for speed, SEO and real business growth.
          </p>
        </motion.div>

        {/* ── Services grid ── */}
        <div className="grid md:grid-cols-2 gap-5">
          {services.map((service, i) => {
            const Icon  = service.icon;
            const theme = serviceThemes[i % serviceThemes.length];

            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 48 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="glass-card glass-card-glow group relative overflow-hidden p-7 flex flex-col cursor-default"
                style={{ '--card-accent': theme.accent }}
              >
                {/* Decorative corner number */}
                <span className="service-number" aria-hidden="true">{theme.num}</span>

                {/* Accent gradient top strip */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-lg transition-opacity duration-300 opacity-40 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, ${theme.accent}, transparent)` }}
                  aria-hidden="true"
                />

                {/* Icon */}
                <div
                  className="service-icon-wrapper"
                  style={{
                    '--tw-shadow-color': theme.glow,
                    color: theme.accent,
                    borderColor: `${theme.accent}28`,
                    background: `${theme.accent}0d`,
                  }}
                  aria-hidden="true"
                >
                  <Icon size={22} />
                </div>

                {/* Number label */}
                <span
                  className="text-xs font-bold tracking-widest mb-2 font-display"
                  style={{ color: theme.accent, opacity: 0.7 }}
                >
                  {theme.num}
                </span>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-[color:var(--text-primary)] mb-3 group-hover:text-white transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-[color:var(--text-secondary)] text-sm leading-relaxed mb-5 flex-grow">
                  {service.desc}
                </p>

                {/* Additional value props */}
                <ul className="flex flex-col gap-2 mb-2">
                  <li className="flex items-start gap-2 text-xs text-[color:var(--text-secondary)]">
                    <span className="text-[color:var(--accent-cyan)] mt-0.5">✓</span>
                    <span>Performance-optimized & SEO-friendly</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-[color:var(--text-secondary)]">
                    <span className="text-[color:var(--accent-cyan)] mt-0.5">✓</span>
                    <span>Responsive across all devices</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-[color:var(--text-secondary)]">
                    <span className="text-[color:var(--accent-cyan)] mt-0.5">✓</span>
                    <span>Post-launch support & maintenance</span>
                  </li>
                </ul>

                {/* Points */}
                <ul className="flex flex-wrap gap-2 mt-auto" aria-label={`${service.title} capabilities`}>
                  {service.points?.map(point => (
                    <li
                      key={point}
                      className="tag tag-default"
                    >
                      {point}
                    </li>
                  ))}
                </ul>

                {/* Hover CTA */}
                <div
                  className="flex items-center gap-1.5 mt-5 text-sm font-semibold font-display opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                  style={{ color: theme.accent }}
                  aria-hidden="true"
                >
                  Learn more
                  <ArrowUpRight size={16} />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}