import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, CheckCircle, MessageCircle } from 'lucide-react';

/**
 * Contact — Glassmorphic contact form + direct contact cards.
 * Features: animated neon focus inputs, loading + success states on submit,
 * WhatsApp quick-hire CTA, and accessible form markup.
 */
export default function Contact({ contact: contactProp }) {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });
  const [form,    setForm]    = useState({ name: '', email: '', message: '' });
  const [status,  setStatus]  = useState('idle'); // idle | sending | sent

  const contact = contactProp || {};
  const links   = contact.links || [];

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate async submission
    await new Promise(r => setTimeout(r, 1200));
    setStatus('sent');
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setStatus('idle'), 4000);
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  });

  return (
    <section id="contact" ref={ref} className="section-shell section-band">
      <div className="section-container">

        {/* ── Header ── */}
        <motion.div {...fadeUp(0)} className="mb-14">
          <span className="section-kicker">{contact.kicker || 'Get In Touch'}</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight tracking-tight mt-2">
            <span className="text-[color:var(--text-primary)]">
              {contact.title || "Let's build something"}
            </span>
            <br />
            <span className="gradient-text">great together</span>
          </h2>
          <p className="text-[color:var(--text-secondary)] mt-4 text-lg max-w-2xl">
            {contact.subtitle}
          </p>
          {contact.availability && (
            <p className="text-[color:var(--success)] text-sm font-medium mt-2 flex items-center gap-2">
              <span className="status-indicator" aria-hidden="true" />
              {contact.availability}
            </p>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">

          {/* ── Left: Contact form (7 cols) ── */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-7">
            <div className="glass-card p-8">
              <h3 className="font-display font-bold text-[color:var(--text-primary)] text-lg mb-6">
                Send a message
              </h3>

              {status === 'sent' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle size={52} className="text-[color:var(--success)] mb-4" aria-hidden="true" />
                  <h4 className="font-display text-xl font-bold text-[color:var(--text-primary)] mb-2">
                    Message sent!
                  </h4>
                  <p className="text-[color:var(--text-secondary)]">
                    Thanks for reaching out. I'll get back to you within 4 hours.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                  aria-label="Contact form"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label htmlFor="contact-name" className="block text-xs font-semibold text-[color:var(--text-tertiary)] mb-1.5 tracking-wide">
                        Name *
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                        className="form-input"
                        required
                        autoComplete="name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-[color:var(--text-tertiary)] mb-1.5 tracking-wide">
                        Email *
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleChange}
                        className="form-input"
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-[color:var(--text-tertiary)] mb-1.5 tracking-wide">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      placeholder="Tell me about your project, budget, and timeline…"
                      value={form.message}
                      onChange={handleChange}
                      className="form-input form-textarea"
                      required
                      rows={5}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary w-full justify-center"
                    whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                    whileTap={{ scale: 0.98 }}
                    aria-label={status === 'sending' ? 'Sending message…' : 'Send message'}
                  >
                    {status === 'sending' ? (
                      <>
                        <span
                          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full inline-block"
                          style={{ animation: 'spin 0.7s linear infinite' }}
                          aria-hidden="true"
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={17} aria-hidden="true" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* ── Right: Quick contact + links (5 cols) ── */}
          <motion.div {...fadeUp(0.2)} className="lg:col-span-5 flex flex-col gap-5">

            {/* WhatsApp quick-hire CTA */}
            <a
              href="https://wa.me/916379080247?text=Hi%20Suresh%2C%20I%20have%20a%20project%20for%20you!"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-5 flex items-center gap-4 border-[color:rgba(37,211,102,0.2)] hover:border-[color:rgba(37,211,102,0.45)] transition-all duration-300 group"
              aria-label="Quick hire via WhatsApp"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.25)' }}
                aria-hidden="true"
              >
                <MessageCircle size={22} style={{ color: '#25d366' }} />
              </div>
              <div>
                <p className="font-display font-bold text-[color:var(--text-primary)] text-sm">
                  Quick Hire via WhatsApp
                </p>
                <p className="text-[color:var(--text-tertiary)] text-xs mt-0.5">
                  +91 6379080247 · Usually responds within an hour
                </p>
              </div>
            </a>

            {/* Contact link cards */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-[color:var(--text-tertiary)] tracking-wider uppercase">
                Or reach me directly
              </p>
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="contact-link-card"
                    aria-label={`${link.label}: ${link.value}`}
                  >
                    <div className="contact-icon-wrap" aria-hidden="true">
                      <Icon size={18} />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold tracking-wider uppercase text-[color:var(--text-tertiary)]">
                        {link.label}
                      </span>
                      <span className="text-[color:var(--text-primary)] font-medium text-sm">
                        {link.value}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Response time note */}
            <div
              className="glass-card p-5 mt-auto"
              style={{ borderColor: 'rgba(77,184,255,0.15)' }}
            >
              <h4 className="font-display font-bold text-[color:var(--text-primary)] text-sm mb-2">
                ⚡ Fast turnaround
              </h4>
              <p className="text-[color:var(--text-secondary)] text-xs leading-relaxed">
                First response within <strong className="text-[color:var(--accent-cyan)]">4 hours</strong>.
                Project kickoff within <strong className="text-[color:var(--accent-cyan)]">24 hours</strong> of agreement.
                98% on-time delivery rate.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}