import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const defaultAchievements = [
  { value: 8, suffix: '+', label: 'Projects Delivered' },
  { value: 99, suffix: '%', label: 'Client Satisfaction Rate' },
  { value: 3, suffix: '+', label: 'Years of Experience' },
  { value: 24, suffix: 'h', label: 'Average Response Time' },
];

function Counter({ value, suffix, active }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    let frame;
    const start = performance.now();
    const duration = 1300;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsBanner({ stats: statsProp }) {
  const { ref, inView } = useInView({ threshold: 0.25, triggerOnce: true });
  const achievements = statsProp || defaultAchievements;

  return (
    <section id="achievements" ref={ref} className="section-shell pt-0">
      <div className="section-container grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="premium-card achievement-card"
          >
            <strong className="achievement-value">
              <Counter value={item.value} suffix={item.suffix} active={inView} />
            </strong>
            <span className="achievement-label">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
