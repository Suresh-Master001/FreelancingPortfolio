import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Globe2, Network, PenTool, ServerCog, ShoppingCart, Smartphone, Workflow } from 'lucide-react';

const defaultServices = [
  { icon: Globe2, title: 'Custom Website Development', desc: 'Premium websites built for brand trust, speed, SEO, and conversion.', points: ['Business websites', 'Landing pages', 'Portfolio sites'] },
  { icon: Code2, title: 'MERN Stack Development', desc: 'Full-stack applications with modern frontend, APIs, auth, and databases.', points: ['React apps', 'Node APIs', 'MongoDB'] },
  { icon: ShoppingCart, title: 'E-Commerce Solutions', desc: 'Online stores with product flows, payments, dashboards, and automation.', points: ['Checkout flows', 'Admin panels', 'Inventory logic'] },
  { icon: ServerCog, title: 'SaaS Applications', desc: 'Subscription-ready platforms with scalable architecture and clean UX.', points: ['Multi-user apps', 'Role systems', 'Analytics'] },
  { icon: Smartphone, title: 'Mobile App Development', desc: 'Mobile-first app experiences and responsive product interfaces.', points: ['PWA builds', 'App screens', 'User flows'] },
  { icon: Network, title: 'API Integration', desc: 'Reliable integrations for payment, CRM, analytics, email, and third-party tools.', points: ['REST APIs', 'Webhooks', 'Automation'] },
  { icon: Workflow, title: 'Business Automation Software', desc: 'Custom tools that reduce manual work and improve operations.', points: ['Dashboards', 'Internal tools', 'Workflows'] },
  { icon: PenTool, title: 'UI/UX Design', desc: 'Modern interfaces designed for clarity, confidence, and better conversion.', points: ['Wireframes', 'Design systems', 'Prototype-ready UI'] },
];

export default function Services({ services: servicesProp }) {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });
  const services = servicesProp || defaultServices;

  return (
    <section id="services" ref={ref} className="section-shell">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }} className="section-header">
          <span className="section-kicker">Services</span>
          <h2 className="section-title">Premium software services for serious business growth.</h2>
          <p className="section-copy">Every service is designed to help you launch faster, convert better, and operate with fewer bottlenecks.</p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <motion.article key={service.title} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.05 }} className="premium-card service-card">
              <div className="service-icon mb-5">
                <service.icon size={22} />
              </div>
              <h3 className="font-display text-lg font-extrabold text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{service.desc}</p>
              <ul className="service-list">
                {service.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
