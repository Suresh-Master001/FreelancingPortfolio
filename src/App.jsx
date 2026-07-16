import FloatingBubbles from './components/FloatingBubbles';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import TechStack from './components/TechStack';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

import {
  personalInfo,
  hero,
  about,
  services,
  processSteps,
  projects,
  techStack,
  testimonials,
  contact,
  footer,
} from './data';

/**
 * App — Main portfolio shell.
 * Section order: Navbar → Hero → About → Services → Projects → TechStack → Process → Testimonials → Contact → Footer
 */
export default function App() {
  return (
    <div className="portfolio-shell">
      {/* Animated floating bubbles background */}
      <FloatingBubbles />

      {/* Content layer */}
      <div className="content-layer">
        <Navbar personalInfo={personalInfo} />
        <Hero hero={hero} />
        <About about={about} personalInfo={personalInfo} />
        <Services services={services} />
        <Portfolio projects={projects} />
        <TechStack techStack={techStack} />
        <Process steps={processSteps} />
        <Testimonials testimonials={testimonials} />
        <Contact contact={contact} />
        <Footer footer={footer} personalInfo={personalInfo} />
      </div>
    </div>
  );
}

