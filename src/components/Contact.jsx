import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, CheckCircle2, Mail, Loader2 } from 'lucide-react';

const projectTypes = [
  'Custom Website', 'MERN Stack App', 'E-Commerce', 'SaaS Platform',
  'Mobile App', 'Business Automation', 'API Integration', 'UI/UX Design',
];

export default function Contact({ contact }) {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true });
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('type', form.type);
      formData.append('message', form.message);
      formData.append('_subject', `New Contact Form Submission from ${form.name}`);
      formData.append('_captcha', 'false');
      formData.append('_template', 'table');

      const res = await fetch(`https://formsubmit.co/${import.meta.env.VITE_CONTACT_EMAIL || 'suresh2309@proton.me'}`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setSubmitted(true);
        setForm({ name: '', email: '', type: '', message: '' });
      } else {
        setError('Failed to send message. Please try again later.');
      }
    } catch (err) {
      setError('Failed to send message. Please try again later.');
      console.error('Contact form error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!contact) return null;

  return (
    <section id="contact" ref={ref} className="section-shell">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="section-header"
        >
          <span className="section-kicker">{contact.kicker || 'Get In Touch'}</span>
          <h2 className="section-title">{contact.title || "Let's work together"}</h2>
          <p className="section-copy">{contact.subtitle}</p>
        </motion.div>

        <div className="contact-grid">
          {/* Left: contact info links */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="contact-info"
          >
            {contact.availability && (
              <div className="flex items-center gap-2 mb-2">
                <span className="status-dot" />
                <span className="text-sm text-[color:var(--muted)]">{contact.availability}</span>
              </div>
            )}

            {contact.links && contact.links.map((link, i) => {
              const Icon = link.icon || Mail;
              return (
                <a
                  key={i}
                  href={link.href}
                  className="contact-link-card"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact-icon">
                    <Icon size={18} />
                  </span>
                  <span>
                    <span className="contact-link-label">{link.label}</span>
                    <span className="contact-link-value">{link.value}</span>
                  </span>
                </a>
              );
            })}
          </motion.div>

          {/* Right: contact form */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            {submitted ? (
              <div className="premium-card p-8 text-center">
                <CheckCircle2 size={44} className="mx-auto mb-5 text-[color:var(--cyan)]" />
                <h3 className="font-display text-2xl font-extrabold text-white">Message received!</h3>
                <p className="mx-auto mt-3 max-w-md text-[color:var(--muted)]">
                  Thank you for reaching out. I'll get back to you within 4 hours.
                </p>
              </div>
            ) : (
              <form id="contact-form" onSubmit={submit} className="premium-card grid gap-5 p-6">
                {error && (
                  <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="contact-field">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      required
                      value={form.name}
                      onChange={update}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={update}
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div className="contact-field">
                  <label htmlFor="type">Project Type</label>
                  <select
                    id="type"
                    name="type"
                    value={form.type}
                    onChange={update}
                  >
                    <option value="">Select a service...</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="contact-field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={form.message}
                    onChange={update}
                    placeholder="Tell me about your project, goals, and ideal timeline."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="button-primary w-full disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={17} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}