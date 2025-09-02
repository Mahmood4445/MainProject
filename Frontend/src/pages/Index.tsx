import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhoWeAre from '@/components/WhoWeAre';
import Reviews from '@/components/Reviews';
import Services from '@/components/Services';
import Milestone from '@/components/Milestone';
import WhyPartnerWithUs from '@/components/WhyPartnerWithUs';
import FutureOutlook from '@/components/FutureOutlook';
import Partners from '@/components/Partners';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

import ClickSpark from '@/components/ClickSpark';


const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 120,
      delay: 100,
    });

    // Enhanced smooth scrolling for anchor links
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          const headerHeight = 80; // Adjusted header height
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    // Active section detection
    const handleScroll = () => {
      const sections = ['home', 'who-we-are', 'services', 'reviews', 'milestone', 'why-partner', 'future-outlook', 'partners'];
      const headerHeight = 80;
      
      // Get current scroll position
      const scrollPosition = window.scrollY + headerHeight + 150;
      
      // Find which section is currently active
      let currentSection = 'home';
      
      // Debug: Log all section positions
      if (window.scrollY > 0) {
        console.log('Current scroll position:', window.scrollY);
        sections.forEach(sectionId => {
          const section = document.getElementById(sectionId);
          if (section) {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + window.pageYOffset;
            const sectionBottom = sectionTop + rect.height;
            console.log(`${sectionId}: top=${sectionTop}, bottom=${sectionBottom}, visible=${scrollPosition >= sectionTop && scrollPosition < sectionBottom}`);
          }
        });
      }
      
      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top + window.pageYOffset;
          const sectionBottom = sectionTop + rect.height;
          
          // Check if current scroll position is within this section
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            // Special case: When in "Why Partner With Us" section, show "Partners" as active
            if (sections[i] === 'why-partner') {
              currentSection = 'partners';
            } else if (sections[i] === 'home') {
              // When in Hero section, don't highlight any navigation item
              currentSection = 'none';
            } else {
              currentSection = sections[i];
            }
            break;
          }
        }
      }
      
      // Only update if the section actually changed
      if (currentSection !== activeSection) {
        console.log('Section changed from', activeSection, 'to', currentSection, 'at scroll position:', scrollPosition);
        setActiveSection(currentSection);
      }
    };

    // Add event listeners
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 scroll-smooth">
      <Header activeSection={activeSection} />

      <ClickSpark
        sparkColor="#10b981"
        sparkSize={10}
        sparkRadius={25}
        sparkCount={8}
        duration={600}
        easing="ease-out"
      >
        <main className="overflow-x-hidden snap-y snap-mandatory">
          <section id="home" className="snap-start">
            <Hero />
          </section>
          <section id="who-we-are" className="snap-start">
            <WhoWeAre />
          </section>
          <section id="services" className="snap-start">
            <Services />
          </section>
          <section id="reviews" className="snap-start">
            <Reviews />
          </section>
          <section id="milestone" className="snap-start">
            <Milestone />
          </section>
          <section id="why-partner" className="snap-start">
            <WhyPartnerWithUs />
          </section>
          <section id="future-outlook" className="snap-start">
            <FutureOutlook />
          </section>
          <section id="partners" className="snap-start">
            <Partners />
          </section>
        </main>
      </ClickSpark>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
