import amadeusLogo from '@/assets/amadeus-logo-removebg-preview.png';
import pciLogo from '@/assets/pci.png';
import pdpcLogo from '@/assets/pdpc.png';
import singaporeTourismLogo from '@/assets/singapore_tourism-removebg-preview.png';
import iataLogo from '@/assets/iata-logo-header.png';

const Partners = () => {
  const partners = [
    { name: "PDPC", logo: pdpcLogo },
    { name: "Amadeus", logo: amadeusLogo },
    { name: "IATA", logo: iataLogo },
    { name: "PCI", logo: pciLogo },
    { name: "Singapore Tourism", logo: singaporeTourismLogo }
  ];

  return (
    <section id="partners" className="py-12 bg-blue-50">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-8" data-aos="fade-up">
          <h2 className="text-5xl sm:text-6xl font-bold text-blue-950 mb-6">Accreditation and Compliance</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Trusted by leading airlines and travel agencies worldwide</p>
        </div>
        
        {/* Partners Logo Scroll - Clean Logo Display */}
        <div className="relative overflow-hidden w-full" data-aos="fade-up" data-aos-delay="200">
          <div className="scrolling-container">
            <div className="scrolling-content">
              {/* First set of logos */}
              {partners.map((partner, index) => (
                <div 
                  key={`first-${index}`}
                  className="flex-shrink-0 w-40 h-24 flex items-center justify-center mx-8"
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {partners.map((partner, index) => (
                <div 
                  key={`second-${index}`}
                  className="flex-shrink-0 w-40 h-24 flex items-center justify-center mx-8"
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .scrolling-container {
            width: 100%;
            overflow: hidden;
            position: relative;
          }
          
          .scrolling-content {
            display: flex;
            animation: scroll 30s linear infinite;
            width: max-content;
          }
          
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .scrolling-content:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  );
};

export default Partners;