import { ArrowUp, Code2 } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer({ footer }) {
  const goTo = (href) => (event) => {
    event.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const name = footer?.name || 'Roshini S';

  return (
    <footer className="border-t border-[color:var(--line)] bg-black/20 py-10">
      <div className="section-container flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="icon-button">
            <Code2 size={18} />
          </span>
          <div>
            <p className="font-display text-xl font-extrabold text-white">{name}</p>
            <p className="text-sm text-[color:var(--muted)]">{footer?.tagline || 'MERN Stack Developer'}</p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-4 text-sm font-bold" aria-label="Footer navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={goTo(link.href)} className="footer-link">
              {link.label}
            </a>
          ))}
        </nav>

        <button type="button" className="icon-button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
          <ArrowUp size={18} />
        </button>
      </div>

      <div className="section-container flex justify-between mt-8 border-t border-[color:var(--line)] pt-6 text-sm text-[color:var(--muted-2)]">
        <span>&copy; {footer?.year || new Date().getFullYear()} {name}. All rights reserved.</span>
        <span>{footer?.note}</span>
      </div>
    </footer>
  );
}
