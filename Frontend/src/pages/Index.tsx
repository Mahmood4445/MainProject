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
    // Optimized AOS initialization
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: true,
      offset: 100,
      delay: 50,
    });

    // Throttled scroll handler for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sections = ['home', 'who-we-are', 'services', 'reviews', 'milestone', 'why-partner', 'future-outlook', 'partners'];
          const headerHeight = 80;
          const scrollPosition = window.scrollY + headerHeight + 100;
          
          let currentSection = 'home';
          
          for (let i = 0; i < sections.length; i++) {
            const section = document.getElementById(sections[i]);
            if (section) {
              const rect = section.getBoundingClientRect();
              const sectionTop = rect.top + window.pageYOffset;
              const sectionBottom = sectionTop + rect.height;
              
              if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                if (sections[i] === 'why-partner') {
                  currentSection = 'partners';
                } else if (sections[i] === 'home') {
                  currentSection = 'none';
                } else {
                  currentSection = sections[i];
                }
                break;
              }
            }
          }
          
          if (currentSection !== activeSection) {
            setActiveSection(currentSection);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Optimized smooth scrolling
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          const headerHeight = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    // Add event listeners
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeSection={activeSection} />

      <ClickSpark
        sparkColor="#10b981"
        sparkSize={8}
        sparkRadius={20}
        sparkCount={6}
        duration={500}
        easing="ease-out"
      >
        <main className="overflow-x-hidden">
          <section id="home">
            <Hero />
          </section>
          <section id="who-we-are">
            <WhoWeAre />
          </section>
          <section id="services">
            <Services />
          </section>
          <section id="reviews">
            <Reviews />
          </section>
          <section id="milestone">
            <Milestone />
          </section>
          <section id="why-partner">
            <WhyPartnerWithUs />
          </section>
          <section id="future-outlook">
            <FutureOutlook />
          </section>
          <section id="partners">
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
