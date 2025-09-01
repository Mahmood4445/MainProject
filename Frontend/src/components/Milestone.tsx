import React from 'react';

const Milestone = () => {
  const milestones = [
    {
      year: "2016",
      title: "Incorporation",
      description: "IT software consultancy",
      color: "from-yellow-400 to-yellow-500"
    },
    {
      year: "2017",
      title: "Singapore Tourism Board license",
      description: "GDS Amadeus",
      color: "from-orange-400 to-pink-500"
    },
    {
      year: "2019",
      title: "International Air Transport Association",
      description: "(GO Lite)",
      color: "from-pink-400 to-purple-500"
    },
    {
      year: "2023",
      title: "International Air Transport (GO Standard)",
      description: "PCI/DSS Compliance",
      color: "from-blue-400 to-blue-500"
    },
    {
      year: "2024 - 2025",
      title: "Corporate Companies",
      description: "57 Airlines Partners",
      color: "from-teal-400 to-green-500"
    },
    {
      year: "2025",
      title: "Back-end Support (India)",
      description: "Personal Data Protection Act",
      color: "from-indigo-400 to-purple-500"
    }
  ];

  return (
    <section id="milestone" className="py-24 bg-white">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-5xl sm:text-6xl font-bold text-blue-950 mb-6">
            Milestone
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            Our journey of innovation and growth in the travel industry
          </p>
        </div>

        {/* Milestones Grid */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 lg:gap-4 overflow-x-auto md:overflow-x-visible [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="text-center group flex flex-col h-full cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 flex-shrink-0 w-64 md:w-auto"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Year */}
              <div className="mb-3 flex-shrink-0">
                <span className="bg-yellow-400 text-blue-950 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 group-hover:bg-yellow-300 group-hover:shadow-lg group-hover:scale-110">
                  {milestone.year}
                </span>
              </div>
              
              {/* Title - Fixed height for alignment */}
              <div className="h-12 mb-3 flex items-center justify-center">
                <h3 className="text-sm font-bold text-blue-950 leading-tight px-1 transition-all duration-300 group-hover:text-blue-600 group-hover:scale-105">
                  {milestone.title}
                </h3>
              </div>
              
              {/* Description - Fixed height for alignment */}
              <div className="h-16 flex items-center justify-center">
                <p className="text-xs text-gray-700 leading-relaxed px-1 transition-all duration-300 group-hover:text-gray-800 group-hover:scale-105">
                  {milestone.description}
                </p>
              </div>
              

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Milestone;
