import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Bug, ClipboardCheck, Code2, Paintbrush, Rocket, Search } from 'lucide-react';

const defaultSteps = [
  { icon: Search, title: 'Discovery', desc: 'Clarify business goals, audience, features, and success metrics.' },
  { icon: ClipboardCheck, title: 'Planning', desc: 'Define scope, roadmap, architecture, and project milestones.' },
  { icon: Paintbrush, title: 'Design', desc: 'Create premium UI direction, user flows, and conversion-focused screens.' },
  { icon: Code2, title: 'Development', desc: 'Build responsive frontend, backend logic, integrations, and workflows.' },
  { icon: Bug, title: 'Testing', desc: 'Validate speed, security, responsiveness, accessibility, and edge cases.' },
  { icon: Rocket, title: 'Launch', desc: 'Deploy, monitor, hand over, and support the first improvement cycle.' },
];

export default function Process({ processSteps }) {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true });
  const steps = processSteps || defaultSteps;

  return (
    <section id="process" ref={ref} className="section-shell">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }} className="section-header">
          <span className="section-kicker">Process</span>
          <h2 className="section-title">A clear path from idea to premium launch.</h2>
          <p className="section-copy">Smooth, structured, and transparent from first call to production release.</p>
        </motion.div>

        <div className="timeline-grid">
          {steps.map((step, index) => (
            <motion.article key={step.title} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.08 }} className="premium-card process-card">
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="process-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="process-icon">
                  <step.icon size={19} />
                </span>
              </div>
              <h3 className="font-display text-lg font-extrabold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{step.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
