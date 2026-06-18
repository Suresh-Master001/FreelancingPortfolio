import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle2 } from 'lucide-react';

export default function Skills({ skills }) {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });
  const categories = skills?.categories || [];

  return (
    <section id="skills" ref={ref} className="section-shell section-band">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="section-header"
        >
          <span className="section-kicker">Skills</span>
          <h2 className="section-title">My Tech Stack &amp; Expertise</h2>
          <p className="section-copy">
            A comprehensive overview of my tools, frameworks, and programming languages.
          </p>
        </motion.div>

        <div className="skills-grid">
          {categories.map((cat, index) => {
            const Icon = cat.icon || CheckCircle2;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="skill-category-card"
              >
                <div className="skill-category-header">
                  <span className="skill-category-icon">
                    <Icon size={17} />
                  </span>
                  <h3 className="skill-category-title">{cat.title}</h3>
                </div>

                <div className="skill-pills">
                  {cat.items.map((item) => (
                    <span className="skill-pill" key={item}>{item}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
