import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function ProjectMockup() {
  return (
    <div className="project-mockup">
      <div className="mock-browser">
        <div className="mock-top">
          <span /><span /><span />
        </div>
        <div className="mock-content">
          <div className="mock-visual" />
          <div>
            <div className="mock-line" />
            <div className="mock-line" />
            <div className="mock-line" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio({ projects: projectsProp }) {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });
  const projects = projectsProp || [];

  return (
    <section id="portfolio" ref={ref} className="section-shell section-band">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="section-header"
        >
          <span className="section-kicker">Projects</span>
          <h2 className="section-title">Client Projects</h2>
          <p className="section-copy">
            Full-stack applications, SaaS platforms, and AI-powered solutions built for real clients.
          </p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="project-card"
            >
              <ProjectMockup />

              <div className="project-body">
                <div className="project-meta">
                  <span className="project-type">{project.type}</span>
                  {project.duration && (
                    <span className="project-duration">{project.duration}</span>
                  )}
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>

                {project.built && (
                  <ul className="project-built">
                    {project.built.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}

                {project.learned && (
                  <p className="project-learned">{project.learned}</p>
                )}

                {project.tags && (
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span className="project-tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                )}

                <div className="project-links">
                  <span className="project-client-badge">Client Project</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}