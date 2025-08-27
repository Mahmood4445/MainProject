import { useEffect, useState, useRef } from 'react';

const Timeline = () => {
  const [centerProgress, setCenterProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  const timelineEvents = [
    {
      year: "2016",
      title: "Incorporation (IT Software Consultancy)",
      description: "GoEasyTrip was incorporated as an IT software consultancy, laying the foundation for future innovations in the travel technology sector."
    },
    {
      year: "2017",
      title: "Singapore Tourism Board License & GDS Amadeus",
      description: "Secured the Singapore Tourism Board license and integrated GDS Amadeus to enhance travel booking and connectivity."
    },
    {
      year: "2019",
      title: "International Air Transport Association (GO Lite)",
      description: "Achieved IATA GO Lite accreditation, enabling secure and efficient access to global airline ticketing systems."
    },
    {
      year: "2023",
      title: "IATA GO Standard & PCI/DSS Compliance",
      description: "Upgraded to IATA GO Standard and achieved PCI/DSS certification, ensuring secure payment processing and global compliance."
    },
    {
      year: "2024",
      title: "Corporate Expansion & Airline Partnerships",
      description: "Formed partnerships with 57 international airlines and enterprises, relationships with corporate clients to expand travel solutions."
    },
    {
      year: "2025",
      title: "Back-End Support (India) & PDPA",
      description: "Established a back-end support center in India and aligned operations with Singapore's Personal Data Protection Act (PDPA)."
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const centerY = windowHeight / 2; // Center of the screen
        
        // Calculate progress based on center of screen position
        if (rect.top <= centerY && rect.bottom >= centerY) {
          // Calculate how much of the timeline is above the center
          const sectionHeight = rect.height;
          const centerPosition = centerY - rect.top;
          const progress = Math.min(Math.max(centerPosition / sectionHeight, 0), 1);
          setCenterProgress(progress);
        } else if (rect.top > centerY) {
          // Timeline section is below center
          setCenterProgress(0);
        } else if (rect.bottom < centerY) {
          // Timeline section is above center
          setCenterProgress(1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="timeline" className="py-24 bg-gray-50" ref={timelineRef}>
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-5xl sm:text-6xl font-bold text-blue-950 mb-6">
            Timeline
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our journey through the years of innovation and growth
          </p>
        </div>

        {/* Timeline Content with Left Section */}
        <div className="flex gap-16 items-start">
          {/* Left Section: Who We Are */}
          <div className="w-1/3 flex-shrink-0" data-aos="fade-right">
            <div className="bg-blue-600 rounded-xl p-8 shadow-xl">
              <h3 className="text-3xl font-bold text-white mb-6">
                Who we are?
              </h3>
              <p className="text-white text-lg leading-relaxed mb-8">
                GoEasyTrip connects agencies and corporates with smart, reliable B2B travel solutions.
              </p>
              
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <div className="text-2xl font-bold text-white">1000+</div>
                    <div className="text-white text-sm">Customers Satisfied</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">5.0</div>
                    <div className="text-white text-sm">Google Rating</div>
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <div className="text-2xl font-bold text-white">100+</div>
                    <div className="text-white text-sm">Countries visited</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">8+</div>
                    <div className="text-white text-sm">Years of Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Timeline */}
          <div className="w-2/3 flex-1 relative">
            {/* Vertical Timeline Line with Centered Fill Effect */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-300">
              {/* Yellow Fill Effect - Fills from top based on center position */}
              <div 
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 bg-yellow-400 transition-all duration-2000 ease-out"
                style={{ 
                  height: `${centerProgress * 100}%`,
                  boxShadow: '0 0 20px rgba(250, 204, 21, 0.8), 0 0 40px rgba(250, 204, 21, 0.4)'
                }}
              >
                {/* Additional yellow glow */}
                <div className="absolute inset-0 bg-yellow-300 blur-sm opacity-60"></div>
                <div className="absolute inset-0 bg-yellow-200 blur-md opacity-40"></div>
              </div>
            </div>

            {/* Timeline Events */}
            <div className="space-y-16">
              {timelineEvents.map((event, index) => (
                <div
                  key={index}
                  className="relative flex items-center flex-row-reverse"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {/* Content */}
                  <div className="w-1/2 pl-8 text-left">
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                      <div className="mb-3">
                        <span className="bg-yellow-400 text-blue-950 px-4 py-2 rounded-full text-sm font-bold">
                          {event.year}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-blue-950 mb-3">
                        {event.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Marker */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                    <div className="w-8 h-8 bg-white rounded-full border-4 border-purple-500 shadow-lg relative">
                      {/* Purple glow around marker */}
                      <div className="absolute inset-0 bg-purple-400 rounded-full blur-md opacity-60 -z-10"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
