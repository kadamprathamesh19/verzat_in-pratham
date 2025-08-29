import React, { useEffect } from 'react';
import Hero from '../components/Hero';
// import Mission from '../components/Mission';
import WhyVerzat from '../components/WhyVerzat';
import Services from '../components/Services';
import Contact from '../components/Contact';
import RDProjectsSection from '../components/RDLatestProjects';
import ParentCompanySection from '../components/ParentCompanySection';
import Vision from '../components/Vision';

const Home = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      let attempts = 0;

      const scrollToSection = () => {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        } else if (attempts < 10) {
          attempts++;
          setTimeout(scrollToSection, 100);
        }
      };

      scrollToSection();
    }
  }, []);

  return (
    <div>
      <Hero />
      <Services />
      <WhyVerzat />
      <Vision />
      {/* <Mission /> */}
      <ParentCompanySection />
      <RDProjectsSection />
      <Contact />
    </div>
  );
};

export default Home;
