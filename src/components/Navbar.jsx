import { useEffect, useState } from 'react';
import { ArrowUpRight, Code2, Menu, X } from 'lucide-react';

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ personalInfo }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = links.map((link) => document.querySelector(link.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current) setActive(`#${current.target.id}`);
      },
      { rootMargin: '-24% 0px -56% 0px', threshold: [0.25, 0.5, 0.75] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navigate = (href) => {
    setActive(href);
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const name = personalInfo?.name || 'Roshini S';
  const roleTitle = personalInfo?.title || 'Full Stack Developer & Freelancer';

  return (
    <nav className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? 'nav-blur' : 'bg-transparent'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <button type="button" onClick={() => navigate('#hero')} className="flex items-center gap-3 text-left" aria-label="Go home">
          <span className="icon-button h-11 w-11">
            <Code2 size={20} />
          </span>
          <span>
            <span className="block font-display text-lg font-extrabold text-white">{name}</span>
            <span className="block text-xs font-bold text-[color:var(--muted)]">{roleTitle}</span>
          </span>
        </button>

        <ul className="hidden items-center gap-1 xl:flex">
          {links.map((link) => (
            <li key={link.href}>
              <button type="button" onClick={() => navigate(link.href)} className={`nav-link px-4 py-2 text-sm font-bold transition ${active === link.href ? 'is-active' : ''}`}>
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button type="button" onClick={() => navigate('#contact')} className="button-primary hidden text-sm lg:inline-flex">
            Hire Me
            <ArrowUpRight size={16} />
          </button>
          <button type="button" onClick={() => setOpen((value) => !value)} className="icon-button xl:hidden" aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-nav-panel xl:hidden">
          <div className="mx-auto grid max-w-7xl gap-2 px-5 py-4">
            {links.map((link) => (
              <button key={link.href} type="button" onClick={() => navigate(link.href)} className={`nav-link w-full px-4 py-3 text-left text-sm font-bold ${active === link.href ? 'is-active' : ''}`}>
                {link.label}
              </button>
            ))}
            <button type="button" onClick={() => navigate('#contact')} className="button-primary mt-2 w-full text-sm">
              Hire Me
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}