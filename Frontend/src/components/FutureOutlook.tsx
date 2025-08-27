import { ChevronRight } from 'lucide-react';

const FutureOutlook = () => {
  const opportunities = [
    {
      number: "1",
      title: "Expand Online Portal",
      description: "Launch a comprehensive travel booking platform targeting local and international users with competitively priced products."
    },
    {
      number: "2",
      title: "Increase Market Share",
      description: "Collaborate with foreign travel agents to boost inbound tourism and contribute to Singapore's tourism growth."
    },
    {
      number: "3",
      title: "Innovate Customer Experience",
      description: "Use latest travel technology to enhance responsiveness, accessibility, and ease of booking for all customers."
    },
    {
      number: "4",
      title: "Partnership and Support",
      description: "Seek strategic alliances with market leaders to accelerate growth and shared success in the travel sector."
    }
  ];

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-5xl sm:text-6xl font-bold text-blue-950 mb-6">
            Future Outlook and Partnership Opportunities
          </h2>
        </div>

        {/* Opportunities List - Simple Format */}
        <div className="max-w-4xl mx-auto mb-16">
          {opportunities.map((opportunity, index) => (
            <div
              key={index}
              className="mb-8 last:mb-0 group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-start space-x-4">
                {/* Number with Chevron */}
                <div className="flex-shrink-0 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 rounded-lg flex items-center justify-center cursor-pointer hover:from-purple-100 hover:via-pink-100 hover:to-purple-200 transition-all duration-300 border border-purple-200">
                    <span className="text-base font-bold text-purple-800">
                      {opportunity.number}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-blue-600 transition-all duration-300 group-hover:opacity-0" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-blue-950 mb-3">
                    {opportunity.title}
                  </h3>
                  {/* Description - Hidden by default, shown on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-base text-gray-700 leading-relaxed">
                      {opportunity.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Concluding Statement */}
        <div className="text-center" data-aos="fade-up">
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            GoEasyTrip invites investors and partners to join in creating a next-generation travel platform that supports Singapore's thriving tourism industry.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FutureOutlook;
