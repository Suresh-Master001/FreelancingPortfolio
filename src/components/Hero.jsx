import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * Hero — Modern, bold layout with split content and glass panels.
 */
export default function Hero({ hero: heroProp }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const hero = heroProp || {};
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (!hero.roles || hero.roles.length <= 1) return;
    const id = setInterval(() => {
      setRoleIndex(i => (i + 1) % hero.roles.length);
    }, 2200);
    return () => clearInterval(id);
  }, [hero.roles]);

  return (
    <section id="hero" ref={ref} className="hero-shell">
      {/* Gradient orbs */}
      <div className="hero-orb-bg" aria-hidden="true">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
      </div>

      <div className="hero-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left column - Main content */}
          <div className="hero-col space-y-6">
            {/* Badge */}
            {hero.kicker && (
              <div className={`hero-panel-badge ${inView ? 'hero-animate-in' : ''}`}>
                <span className="hero-panel-badge-dot" aria-hidden="true" />
                <span>{hero.kicker}</span>
              </div>
            )}

            {/* Title */}
            <div className={`hero-title-wrapper ${inView ? 'hero-animate-in' : ''}`}>
              <h1 className="hero-title">
                <span className="hero-title-highlight block mb-2">
                  {hero.title || 'Building Modern Websites &'}
                </span>
                <span className="gradient-text hero-title-gradient">
                  {hero.titleHighlight || 'Smart AI Solutions'}
                </span>
              </h1>
            </div>

            {/* Tagline */}
            {hero.tagline && (
              <p className={`hero-subtitle ${inView ? 'hero-animate-in' : ''}`}>
                {hero.tagline}
              </p>
            )}

            {/* Rotating roles */}
            {hero.roles && hero.roles.length > 0 && (
              <div className={`role-rotator ${inView ? 'hero-animate-in' : ''}`}>
                <span className="text-[color:var(--text-tertiary)]">I am a</span>
                <span className="gradient-text font-bold role-highlight">
                  {hero.roles[roleIndex]}
                </span>
              </div>
            )}

            {/* CTA Buttons */}
            <div className={`hero-cta ${inView ? 'hero-animate-in' : ''}`}>
              <a href="#contact" className="btn-primary btn-glow">
                <span>Start a Project</span>
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a href="#work" className="btn-secondary btn-glass">
                <Sparkles size={18} aria-hidden="true" />
                <span>View My Work</span>
              </a>
            </div>
          </div>

          {/* Right column - Stats/metrics glass panel */}
          <div className={`hero-col ${inView ? 'hero-animate-in hero-panel-animate' : ''}`}>
            <div className="hero-glass-panel">
              <div className="hero-panel-header">
                <div className="hero-panel-badge">
                  <span className="hero-panel-badge-dot" aria-hidden="true" />
                  <span>Quick Stats</span>
                </div>
                <h3 className="hero-panel-title">
                  Delivering Excellence, One Project at a Time
                </h3>
              </div>

              {/* Stats grid */}
              <div className="hero-panel-grid">
                <div className="hero-metric">
                  <div className="hero-metric-value gradient-text">05 +</div>
                  <div className="hero-metric-label">Projects Delivered Successfully</div>
                </div>
                <div className="hero-metric">
                  <div className="hero-metric-value gradient-text">100 %</div>
                  <div className="hero-metric-label">Client Satisfaction Rate</div>
                </div>
                <div className="hero-metric">
                  <div className="hero-metric-value gradient-text">3 hrs</div>
                  <div className="hero-metric-label">Average Response Time</div>
                </div>
                <div className="hero-metric">
                  <div className="hero-metric-value gradient-text">24 / 7</div>
                  <div className="hero-metric-label">Support & Maintenance</div>
                </div>
              </div>

              {/* CTA */}
              <div className="hero-panel-cta">
                <a href="#contact" className="btn-secondary btn-secondary-panel">
                  Get in Touch
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}