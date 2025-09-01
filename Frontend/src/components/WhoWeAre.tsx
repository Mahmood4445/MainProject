import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect, useRef } from 'react';
import TiltedCard from './TiltedCard';
import Magnet from './Magnet';

// Custom hook for counting animation
const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isVisible]);

  return { count, ref };
};

const WhoWeAre = () => {
  const cards = [
    {
      title: "Who We Are?",
      description: "At GoEasyTrip, we provide smart B2B solutions for travel agencies and corporate clients, offering seamless access to flight, hotel, and travel service to trusted global airline networks and reliable GDS platforms."
    },
    {
      title: "Mission", 
      description: "Our mission is to empower partners with advanced technology, competitive pricing, and dedicated support helping them achieve rates through cutting edge technology and ensure simple, user friendly access for all."
    },
    {
      title: "Vision",
      description: "Our vision is to be the most trusted B2B travel partner delivering seamless global connectivity through smart, scalable technology solutions and enhancing every 24/7 specialized for simplicity and convenience, made by travel professionals."
    }
  ];

  const stats = [
    { number: 1000, label: "Customers Satisfied", suffix: "+" },
    { number: 100, label: "Countries visited", suffix: "+" },
    { number: 5.0, label: "Google Rating", suffix: "" },
    { number: 8, label: "Years of Experience", suffix: "+" }
  ];

  return (
    <section id="who-we-are" className="py-12 bg-white">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-5xl sm:text-6xl font-bold text-blue-950 mb-6">
            About Us
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Empowering businesses with innovative travel technology solutions
          </p>
        </div>

        {/* Cards Grid with TiltedCard and Magnet Effect */}
        <div className="flex md:grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20 overflow-x-auto md:overflow-x-visible [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {cards.map((card, index) => (
            <div key={index} data-aos="fade-up" data-aos-delay={index * 200} className="flex-shrink-0 w-80 md:w-auto">
              <Magnet 
                padding={80} 
                disabled={false} 
                magnetStrength={30}
                wrapperClassName="w-full"
              >
                <TiltedCard
                  title={card.title}
                  description={card.description}
                  containerHeight="300px"
                  containerWidth="100%"
                  scaleOnHover={1.05}
                  rotateAmplitude={8}
                  showMobileWarning={false}
                  showTooltip={false}
                />
              </Magnet>
            </div>
          ))}
        </div>

        {/* Stats Section with Magnet Effect */}
        <Magnet 
          padding={100} 
          disabled={false} 
          magnetStrength={25}
          wrapperClassName="w-full"
        >
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-8 sm:p-12 shadow-2xl" data-aos="fade-up" data-aos-delay="400">
            <div className="text-center mb-8" data-aos="fade-up" data-aos-delay="500">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Achievements</h3>
              <p className="text-white/95 leading-relaxed text-base max-w-2xl mx-auto">
                Our achievements reflect our commitment to excellence in B2B travel solutions, delivering innovative technology, competitive pricing, and exceptional service to our global network of partners and clients.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const { count, ref } = useCountUp(stat.number, 2500);
                
                return (
                  <div key={index} className="text-center" data-aos="fade-up" data-aos-delay={600 + (index * 100)}>
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-2" ref={ref}>
                      {stat.number === 5.0 ? count.toFixed(1) : count}{stat.suffix}
                    </div>
                    <div className="text-white/80 font-medium text-sm">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Magnet>
      </div>
    </section>
  );
};

export default WhoWeAre;