import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, BriefcaseBusiness, Award, MessageCircle, Code2 } from 'lucide-react';

const defaultRoles = [
  'MERN Stack Developer',
  'Full Stack Developer',
  'React.js Developer',
  'Node.js Developer',
];

function Typewriter({ roles = defaultRoles }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!roles.length) return;
    const full = roles[index];
    const timer = setTimeout(() => {
      if (!deleting) {
        const next = full.slice(0, text.length + 1);
        setText(next);
        if (next === full) setTimeout(() => setDeleting(true), 1400);
      } else {
        const next = full.slice(0, text.length - 1);
        setText(next);
        if (!next) {
          setDeleting(false);
          setIndex((v) => (v + 1) % roles.length);
        }
      }
    }, deleting ? 30 : 65);
    return () => clearTimeout(timer);
  }, [deleting, index, text, roles]);

  return (
    <span>
      {text}
      <span className="ml-1 text-[color:var(--blue)]">|</span>
    </span>
  );
}

export default function Hero({ hero: heroProp, personalInfo }) {
  const goTo = (selector) => (e) => {
    e.preventDefault();
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
  };

  const { title, titleHighlight, tagline, roles = defaultRoles, stats = [] } = heroProp || {};

  return (
    <section id="hero" className="hero-shell">
      <div className="section-container">
        <motion.div
          className="hero-inner"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          {/* 1. Status kicker */}
          <div className="hero-kicker">
            <span className="status-dot" />
            Available for freelance
          </div>

          {/* 2. Name + location on one line */}
          <div className="hero-name-row">
            <h2 className="hero-name">
              Hi, I'm <span className="gradient-text">{personalInfo?.name || 'Roshini S'}</span>
            </h2>
            <span className="hero-location">
              <MapPin size={13} />
              {personalInfo?.location || 'Dharmapuri, TN'}
            </span>
          </div>

          {/* 3. Main headline */}
          <h1 className="hero-title">
            {title} <span className="gradient-text">{titleHighlight}</span>
          </h1>

          {/* 4. Typewriter role line */}
          <div className="hero-role">
            <Typewriter roles={roles} />
          </div>

          {/* 5. Tagline */}
          <p className="hero-subtitle">{tagline}</p>

          {/* 6. CTA buttons */}
          <div className="hero-actions">
            <a className="button-primary" href="#services" onClick={goTo('#services')}>
              View My Services
              <ArrowUpRight size={17} />
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  );
}