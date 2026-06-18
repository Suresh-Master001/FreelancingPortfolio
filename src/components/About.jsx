import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Database, Cpu, Timer } from 'lucide-react';
import profilePicture from '../assets/profilePicture.png';

const defaultCredibility = [
  { icon: Code2,     label: 'MERN stack — React, Node, Express, MongoDB' },
  { icon: Database,  label: 'Schema design, REST APIs & JWT auth' },
  { icon: Cpu,       label: 'AI & DS undergraduate — CGPA 8.1' },
  { icon: Timer,     label: 'Self-directed learner with shipped projects' },
];

export default function About({ about, personalInfo }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const name          = personalInfo?.name;
  const roleTitle     = personalInfo?.title;
  const location      = personalInfo?.location;
  const bio           = about?.bio;
  const credibility   = about?.credibility || defaultCredibility;

  return (
    <section id="about" ref={ref} className="section-shell section-band">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="section-header"
        >
          <span className="section-kicker">{about?.kicker || 'About Me'}</span>
          <h2 className="section-title">{about?.title || 'A fresher developer who builds things end-to-end.'}</h2>
        </motion.div>

        <div className="about-grid">
          {/* Left: portrait card */}
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65 }}
          >
            <div className="about-portrait">
              <img src={profilePicture} alt="Profile" className="profile-image" />
              <div className="portrait-card">
                <div className="flex items-center gap-3">
                  <span className="status-dot" />
                  <div>
                    <p className="font-display pl-3 text-xl font-extrabold text-white">{name}</p>
                    <p className="text-sm pl-3 text-[color:var(--muted)]">{roleTitle}</p>
                    <p className="mt-3 pl-3 text-xs text-[color:var(--muted-2)] font-medium">{location}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: text column */}
          <motion.div
            initial={{ opacity: 0, x: 34 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <div className="about-body">
              <p className="about-bio">{bio}</p>

              <div className="about-creds">
                {credibility.map((item) => {
                  const Icon = item.icon || Code2;
                  return (
                    <div key={item.label} className="about-cred-item">
                      <Icon size={16} />
                      {item.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
