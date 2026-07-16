import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-scroll';

const navLinks = [
  { to: 'hero',         label: 'Home'      },
  { to: 'about',        label: 'About'     },
  { to: 'services',     label: 'Services'  },
  { to: 'projects',     label: 'Work'      },
  { to: 'tech-stack',   label: 'Tech Stack'},
  { to: 'process',      label: 'Process'   },
  { to: 'testimonials', label: 'Reviews'   },
  { to: 'contact',      label: 'Contact'   },
];

/**
 * Navbar — Clean, minimal fixed navbar with glass effect.
 */
export default function Navbar({ personalInfo }) {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <motion.nav
        role="navigation"
        aria-label="Main navigation"
        className="navbar-fixed"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="navbar-inner">
          {/* Logo */}
          <a href="#hero" className="navbar-logo" aria-label="Codenxte — go to top">
            <span className="logo-mark" aria-hidden="true">
              <span className="logo-dot" />
            </span>
            <span className="logo-text font-display">SURESH S</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6" role="list">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                spy={true}
                smooth={true}
                offset={-72}
                duration={700}
                activeClass="nav-active"
                className="nav-link"
                role="listitem"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-3">
            <a href="#contact" className="btn-primary">
              Let's Talk
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(prev => !prev)}
            className="md:hidden nav-mobile-toggle"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,  opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0,  opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile menu drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-label="Mobile navigation menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="mobile-menu md:hidden"
            >
              <div className="mobile-menu-inner">
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    spy={true}
                    smooth={true}
                    offset={-72}
                    duration={700}
                    onClick={() => setMobileOpen(false)}
                    activeClass="nav-active"
                    className="nav-link-mobile"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mobile-menu-cta">
                  <a href="#contact" className="btn-primary w-full justify-center">
                    Let's Talk
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}