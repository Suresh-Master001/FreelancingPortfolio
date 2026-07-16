import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * Process — Horizontal step timeline with Framer Motion animations.
 *
 * Desktop: horizontal layout with a scroll-linked gradient progress line.
 * Mobile: vertical stacked cards.
 */
export default function Process({ processSteps: stepsProp }) {
  const { ref: inViewRef, inView } = useInView({ threshold: 0.08, triggerOnce: true });
  const sectionRef = useRef(null);
  const steps = stepsProp || [];

  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const [progressPct, setProgressPct] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setProgressPct(100);
      return;
    }
    const unsub = scrollYProgress.on('change', (v) => {
      const pct = Math.max(0, Math.min(1, v)) * 100;
      setProgressPct(pct);
    });
    return () => {
      // framer-motion returns an unsubscribe function
      if (typeof unsub === 'function') unsub();
    };
  }, [prefersReducedMotion, scrollYProgress]);

  const accentColors = ['#4db8ff', '#00f5d4', '#8b5cf6', '#f472b6', '#fbbf24'];

  return (
    <section
      id="process"
      ref={(el) => {
        sectionRef.current = el;
        inViewRef(el);
      }}
      className="section-shell section-band"
    >
      <div className="section-container">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="section-kicker">Our Process</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight tracking-tight mt-2">
            <span className="text-[color:var(--text-primary)]">A proven framework that</span>
            <br />
            <span className="gradient-text">delivers exceptional results</span>
          </h2>
          <p className="text-[color:var(--text-secondary)] mt-5 max-w-2xl text-lg">
            Every project follows a proven methodology refined over 20+ successful deliveries.
            From initial discovery to post-launch support, I ensure quality and transparency at every stage.
          </p>
        </motion.div>

        {/* ── Extra block: What you get ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-14"
        >
          <div className="flex flex-col md:flex-row md:items-stretch gap-4 md:gap-6">
            <div className="md:flex-1 glass-card p-6">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl"
                  style={{
                    background: 'rgba(77,184,255,0.08)',
                    border: '1px solid rgba(77,184,255,0.18)',
                    color: '#4db8ff',
                  }}
                  aria-hidden="true"
                >
                  ✓
                </span>
                <h3 className="font-display font-bold text-[color:var(--text-primary)] text-lg">
                  What you get
                </h3>
              </div>
              <ul className="space-y-2">
                {[
                  { title: 'Clear scope & success metrics', desc: 'So everyone knows what “done” means.' },
                  { title: 'Design + UX flow before development', desc: 'Fewer surprises, smoother implementation.' },
                  { title: 'MVP-ready build with quality checks', desc: 'Performance, SEO, and maintainability baked in.' },
                  { title: 'Launch + post-launch support', desc: 'Stability monitoring and iterative improvements.' },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span
                      className="mt-1 h-2.5 w-2.5 rounded-full flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg,#00f5d4,#4db8ff)' }}
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[color:var(--text-primary)] text-sm font-semibold">{item.title}</p>
                      <p className="text-[color:var(--text-secondary)] text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:w-[420px] glass-card p-6">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl"
                  style={{
                    background: 'rgba(0,245,212,0.08)',
                    border: '1px solid rgba(0,245,212,0.18)',
                    color: '#00f5d4',
                  }}
                  aria-hidden="true"
                >
                  ⏱
                </span>
                <h3 className="font-display font-bold text-[color:var(--text-primary)] text-lg">
                  Typical timeline
                </h3>
              </div>
              <p className="text-[color:var(--text-secondary)] text-sm leading-relaxed mb-4">
                Timelines vary by scope, but the process stays consistent—so you always know what’s coming next.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { k: 'Discovery', v: 'Day 1–3' },
                  { k: 'Design', v: 'Week 1' },
                  { k: 'Build', v: 'Week 2–4' },
                  { k: 'Test + Launch', v: 'Week 5 + rollout' },
                ].map((t) => (
                  <div key={t.k} className="p-3 rounded-14" style={{ border: '1px solid rgba(200,215,255,0.12)', background: 'rgba(200,215,255,0.03)' }}>
                    <p className="text-[color:var(--text-tertiary)] text-[0.68rem] uppercase font-semibold tracking-widest">{t.k}</p>
                    <p className="text-[color:var(--text-primary)] text-sm font-display font-bold mt-1">{t.v}</p>
                  </div>
                ))}
              </div>
              <p className="text-[color:var(--text-tertiary)] text-xs mt-4">
                Deliverable timeline is updated after scope confirmation.
              </p>
            </div>
          </div>
        </motion.div>


        {/* ── Desktop: horizontal timeline ── */}
        <div className="hidden md:block relative" aria-label="Development process steps">
          {/* Track line (background) */}
          <div
            className="absolute left-[10%] right-[10%] top-9"
            style={{ height: '2px', background: 'var(--border-glass)', borderRadius: '2px' }}
            aria-hidden="true"
          />
          {/* Animated fill line */}
          <motion.div
            className="absolute left-[10%] top-9 process-line-fill"
            style={{ width: `${progressPct}%` }}
            aria-hidden="true"
            transition={{ ease: 'linear' }}
          />

          {/* Steps */}
          <div className="grid grid-cols-5 gap-4 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const accent = accentColors[i % accentColors.length];

              const stepIndex = String(i + 1).padStart(2, '0');

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.55 }}
                  className="process-step flex flex-col items-center text-center group"
                >
                  {/* Icon circle with accent border */}
                  <div
                    className="process-icon-circle relative mb-4"
                    style={{
                      border: `2px solid ${accent}40`,
                      boxShadow: `0 0 20px ${accent}20`,
                    }}
                  >
                    <Icon size={24} aria-hidden="true" style={{ color: accent }} />
                    {/* Pulse ring */}
                    <div
                      className="absolute inset-0 rounded-full animate-ping opacity-20"
                      style={{ border: `2px solid ${accent}` }}
                    />
                  </div>

                  {/* Step number + title */}
                  <div className="process-step-text">
                    <span
                      className="process-step-num mb-2 inline-block px-3 py-1 rounded-full text-xs"
                      style={{
                        background: `${accent}15`,
                        color: accent,
                        border: `1px solid ${accent}30`,
                      }}
                    >
                      {stepIndex}
                    </span>

                    <h3
                      className="font-display font-bold text-[color:var(--text-primary)] text-base mb-2 transition-colors"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {step.title}
                      {step.timeframe ? (
                        <span
                          className="ml-2 inline-flex items-center text-[color:var(--text-tertiary)] text-[0.68rem] font-semibold"
                          style={{ color: `${accent}` }}
                        >
                          · {step.timeframe}
                        </span>
                      ) : null}
                    </h3>

                    {step.deliverable ? (
                      <p
                        className="process-deliverable text-[color:var(--text-secondary)] text-xs mb-1"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {step.deliverable}
                      </p>
                    ) : null}

                    <p className="text-[color:var(--text-secondary)] text-xs leading-relaxed px-2">
                      {step.desc}
                    </p>

                    {/* Bullets reveal on hover/focus (desktop) */}
                    <ul className="process-bullets mt-3 px-2 text-left">
                      {(step.bullets || []).map((b, bi) => (
                        <li key={b} className="process-bullet">
                          <span
                            className="process-bullet-dot"
                            style={{ background: `${accent}` }}
                            aria-hidden="true"
                          />
                          <span className="process-bullet-text">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile: vertical stacked cards ── */}
        <div className="md:hidden relative" aria-label="Development process steps">
          {/* Connector line */}
          <div className="process-connector" aria-hidden="true" />
          <div className="flex flex-col gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const accent = accentColors[i % accentColors.length];
              const stepIndex = String(i + 1).padStart(2, '0');

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="process-card glass-card p-6 flex items-start gap-4"
                  style={{ ['--accent']: accent }}
                >
                  <div className="flex-shrink-0 relative">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${accent}15`,
                        border: `1.5px solid ${accent}30`,
                        color: accent,
                      }}
                      aria-hidden="true"
                    >
                      <Icon size={22} />
                    </div>
                    <div
                      className="process-connector-dot"
                      style={{ background: `${accent}` }}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-xs font-bold tracking-wider font-display px-2.5 py-0.5 rounded-full"
                        style={{
                          background: `${accent}15`,
                          color: accent,
                          border: `1px solid ${accent}30`,
                        }}
                      >
                        {stepIndex}
                      </span>
                      <h3 className="font-display font-bold text-[color:var(--text-primary)] text-base">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-[color:var(--text-secondary)] text-sm leading-relaxed">
                      {step.desc}
                    </p>

                    {step.deliverable ? (
                      <p className="process-deliverable-mobile mt-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <span className="font-semibold" style={{ color: accent }}>
                          Deliverable:
                        </span>{' '}
                        {step.deliverable}
                      </p>
                    ) : null}

                    {(step.bullets || []).length ? (
                      <ul className="process-bullets-mobile mt-3">
                        {(step.bullets || []).map((b) => (
                          <li key={b} className="process-bullet-mobile">
                            <span
                              className="process-bullet-dot"
                              style={{ background: `${accent}` }}
                              aria-hidden="true"
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

