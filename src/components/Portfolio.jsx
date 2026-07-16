import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { ExternalLink } from 'lucide-react';

// Mesh gradient backgrounds per project (CSS gradient art)
const projectMeshes = [
  // CareerSphereAI — teal/blue
  'radial-gradient(ellipse at 20% 30%, rgba(0,245,212,0.35) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(77,184,255,0.3) 0%, transparent 55%), linear-gradient(135deg, #050508 0%, #0a1020 100%)',
  // MentorMind — violet/blue
  'radial-gradient(ellipse at 70% 20%, rgba(139,92,246,0.4) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(77,184,255,0.25) 0%, transparent 55%), linear-gradient(135deg, #050508 0%, #0d0820 100%)',
  // AlphaLegalGPT — gold/violet
  'radial-gradient(ellipse at 30% 60%, rgba(251,191,36,0.25) 0%, transparent 50%), radial-gradient(ellipse at 75% 25%, rgba(139,92,246,0.35) 0%, transparent 55%), linear-gradient(135deg, #080506 0%, #120e05 100%)',
];

// Tag color mapping
const tagColors = {
  'AI':       'tag-ai',
  'SaaS':     'tag-saas',
  'MERN':     'tag-mern',
  'RAG':      'tag-rag',
  'LegalTech':'tag-ai',
  'Management':'tag-saas',
};

function getTagClass(tag) {
  for (const [key, cls] of Object.entries(tagColors)) {
    if (tag.toLowerCase().includes(key.toLowerCase())) return cls;
  }
  return 'tag-default';
}

/**
 * Portfolio — Case-study cards with gradient mesh headers, 3D tilt on hover,
 * color-coded tech tags, and direct GitHub / live links.
 */
export default function Portfolio({ projects: projectsProp }) {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });
  const projects = projectsProp || [];

  return (
    <section id="projects" ref={ref} className="section-shell section-band">
      <div className="section-container">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="section-kicker">Featured Projects</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight tracking-tight mt-2">
            <span className="text-[color:var(--text-primary)]">Case studies of</span>
            <br />
            <span className="gradient-text">digital products built to scale</span>
          </h2>
          <p className="text-[color:var(--text-secondary)] mt-5 max-w-2xl text-lg">
            Each project solves a real problem with clean code, thoughtful UX, and tech that scales.
            From AI-powered platforms to full-stack SaaS applications, I deliver solutions built for real business value.
          </p>
        </motion.div>

        {/* ── Projects grid ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id || project.title}
              initial={{ opacity: 0, y: 48 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12 }}
            >
              <Tilt
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                tiltTransitionSpeed={500}
                glareEnable={true}
                glareMaxOpacity={0.12}
                glareColor="#4db8ff"
                glarePosition="all"
                glareBorderRadius="18px"
                className="h-full"
              >
                <article className="glass-card glass-card-glow h-full flex flex-col overflow-hidden">

                  {/* Mesh gradient header */}
                  <div
                    className="project-header"
                    style={{ background: projectMeshes[i % projectMeshes.length] }}
                    aria-hidden="true"
                  >
                    {/* Floating project number */}
                    <span
                      className="absolute top-4 left-5 font-display text-xs font-bold tracking-widest z-10"
                      style={{ color: 'rgba(255,255,255,0.4)' }}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Floating type badge */}
                    <span
                      className="absolute top-4 right-5 text-xs font-semibold px-2.5 py-1 rounded-full z-10"
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: 'rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {project.type}
                    </span>

                    {/* Decorative floating icon cluster */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                      <div className="w-16 h-16 rounded-2xl border-2 border-white/20 rotate-12" />
                      <div className="absolute w-10 h-10 rounded-xl border border-white/15 -rotate-6 translate-x-8 translate-y-4" />
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Duration */}
                    <span className="project-number">{project.duration}</span>

                    {/* Title */}
                    <h3 className="font-display text-xl font-bold text-[color:var(--text-primary)] mb-3 group-hover:gradient-text transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[color:var(--text-secondary)] text-sm leading-relaxed mb-4 flex-grow">
                      {project.desc}
                    </p>

                    {/* Project highlights */}
                    <ul className="flex flex-col gap-1.5 mb-4">
                      <li className="flex items-start gap-2 text-xs text-[color:var(--text-tertiary)]">
                        <span className="text-[color:var(--accent-cyan)] mt-0.5">▸</span>
                        <span>Production-ready deployment with CI/CD</span>
                      </li>
                      <li className="flex items-start gap-2 text-xs text-[color:var(--text-tertiary)]">
                        <span className="text-[color:var(--accent-cyan)] mt-0.5">▸</span>
                        <span>Scalable architecture for 10K+ users</span>
                      </li>
                    </ul>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4" aria-label="Technologies used">
                      {project.tech?.map(tech => (
                        <span key={tech} className="tag tag-default">{tech}</span>
                      ))}
                    </div>

                    {/* Category tags */}
                    {project.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags.map(tag => (
                          <span key={tag} className={`tag ${getTagClass(tag)}`}>{tag}</span>
                        ))}
                      </div>
                    )}

                    {/* Action links */}
                    <div
                      className="flex gap-3 pt-4 mt-auto border-t"
                      style={{ borderColor: 'var(--border-glass)' }}
                    >
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary !py-2 !px-4 !text-xs flex-1 justify-center"
                          aria-label={`View ${project.title} live demo`}
                        >
                          <ExternalLink size={13} aria-hidden="true" />
                          View Live
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary !py-2 !px-4 !text-xs flex-1 justify-center"
                          aria-label={`View ${project.title} source code on GitHub`}
                        >
                          <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                          Source
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}