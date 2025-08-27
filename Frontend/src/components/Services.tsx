import { ChevronRight } from 'lucide-react';

const Services = () => {
  const services = [
    {
      number: "01",
      title: "Flight Booking",
      description: "Access to global airline networks with competitive pricing and real-time availability."
    },
    {
      number: "02",
      title: "Technology Support",
      description: "24/7 technical assistance and API integration for seamless connectivity."
    },
    {
      number: "03",
      title: "B2B Solutions",
      description: "Comprehensive business-to-business travel management and booking systems."
    },
    {
      number: "04",
      title: "Corporate Travel",
      description: "Dedicated corporate travel solutions with expense management and reporting."
    }, 
    {
      number: "05",
      title: "Visa Assistance",
      description: "Expert support for your visa application process"
    }, 
    {
      number: "06",
      title: "Miscellaneous Booking",
      description: "Attractions, Bus, Ferry & Cruise Tickets, Local Transport, Travel Insurance."
    }
  ];

  return (
    <section id="services" className="py-12 bg-blue-50">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl mx-auto">
        {/* Services Section */}
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-5xl sm:text-6xl font-bold text-blue-950 mb-6">
            Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive travel solutions designed for modern businesses
          </p>
        </div>

        {/* Services List - Two Column Format */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-start space-x-4">
                  {/* Number with Chevron */}
                  <div className="flex-shrink-0 flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-br rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 border ${
                      index === 0 ? 'from-red-50 via-red-100 to-red-200 border-red-200' : 
                      index === 1 ? 'from-green-50 via-green-100 to-green-200 border-green-200' : 
                      index === 2 ? 'from-purple-50 via-purple-100 to-purple-200 border-purple-200' : 
                      index === 3 ? 'from-yellow-50 via-yellow-100 to-yellow-200 border-yellow-200' :
                      index === 4 ? 'from-pink-50 via-pink-100 to-pink-200 border-pink-200' :
                      index === 5 ? 'from-orange-50 via-orange-100 to-orange-200 border-orange-200' :
                      'from-cyan-50 via-cyan-100 to-cyan-200 border-cyan-200'
                    }`}>
                      <span className={`text-lg font-bold ${
                        index === 0 ? 'text-red-800' : 
                        index === 1 ? 'text-green-800' : 
                        index === 2 ? 'text-purple-800' : 
                        index === 3 ? 'text-yellow-800' :
                        index === 4 ? 'text-pink-800' :
                        index === 5 ? 'text-orange-800' :
                        'text-cyan-800'
                      }`}>
                        {service.number}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-blue-600 transition-all duration-300 group-hover:opacity-0" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-blue-950 mb-3">
                      {service.title}
                    </h3>
                    {/* Description - Hidden by default, shown on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-base text-gray-700 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;