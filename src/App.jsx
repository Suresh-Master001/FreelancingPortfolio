import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AnimatedBackgroundLite from './components/AnimatedBackgroundLite';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Process from './components/Process';
import StatsBanner from './components/StatsBanner';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';

import {
  personalInfo,
  hero,
  about,
  services,
  processSteps,
  stats,
  projects,
  skills,
  contact,
  footer,
} from './data';

export default function App() {
  return (
    <div className="portfolio-shell">
      <AnimatedBackgroundLite />
      <Navbar personalInfo={personalInfo} />

      <main>
        <Hero hero={hero} personalInfo={personalInfo} />
        <StatsBanner stats={stats} />
        <About about={about} personalInfo={personalInfo} />
        <Services services={services} />
        <Process processSteps={processSteps} />
        <Skills skills={skills} />
        <Portfolio projects={projects} />
        <Contact contact={contact} />
      </main>

      <FloatingContact contact={contact} />
      <Footer footer={footer} />
    </div>
  );
}