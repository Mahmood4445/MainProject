import { CheckCircle, Users, Shield, BarChart3, Settings, Globe, Cog } from 'lucide-react';

const WhyPartnerWithUs = () => {
  const features = [
    {
      icon: Users,
      title: "Dynamic Workforce",
      description: "Experienced team dedicated to delivering exceptional service"
    },
    {
      icon: Shield,
      title: "Transparent Work Model",
      description: "Clear processes that build trust and ensure efficiency"
    },
    {
      icon: BarChart3,
      title: "Competitive Pricing Strategy",
      description: "Maximum value with strategic cost optimization"
    },
    {
      icon: Settings,
      title: "Robust Customer Support System",
      description: "Comprehensive support infrastructure for all your needs"
    },
    {
      icon: CheckCircle,
      title: "One Call, Complete Travel Solution",
      description: "Get everything you need with just one phone call"
    },
    {
      icon: Globe,
      title: "Strategic Location and Market Access",
      description: "Prime positioning for global market reach and accessibility"
    },
    {
      icon: Cog,
      title: "GDS, Ticketing Inventory & Authority",
      description: "Full integration with global distribution systems and authorities"
    },
    {
      icon: Shield,
      title: "Transparent Travels",
      description: "Clear, honest pricing and service delivery"
    },
    {
      icon: CheckCircle,
      title: "Trusted Journeys",
      description: "Reliable and secure travel experiences"
    },
    {
      icon: BarChart3,
      title: "CRM & Reporting Tools",
      description: "Advanced customer relationship management and analytics"
    },
    {
      icon: Users,
      title: "Dedicated Account Manager",
      description: "Personalized service with your own dedicated representative"
    },
    {
      icon: Settings,
      title: "Customer Support",
      description: "24/7 support to handle all your travel requirements"
    },
    {
      icon: CheckCircle,
      title: "Instant PNR Generation",
      description: "Quick and efficient passenger name record creation"
    },
    {
      icon: BarChart3,
      title: "Multi-Airline Fare Comparison",
      description: "Compare fares across multiple airlines for best deals"
    },
    {
      icon: CheckCircle,
      title: "Special Fares and Promotions",
      description: "Access to exclusive deals and promotional offers"
    }
  ];

  const highlights = [
    "Instant PNR Generation",
    "Multi-Airline Fare Comparison",
    "Special Fares & Promotions",
    "Advanced CRM & Reporting Tools",
    "Transparent Travel Solutions",
    "Trusted Journey Support"
  ];

  return (
    <section className="py-12 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-5xl sm:text-6xl font-bold text-blue-950 mb-6">
            Why Partner With Us
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            End-to-end travel solutions with smart technology, competitive pricing, and customer-first support.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="w-3/4 mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-2 md:p-4 hover:bg-blue-100 hover:scale-105 transition-all duration-300 cursor-pointer group h-24 md:h-20 flex items-center justify-center"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <h4 className="text-xs md:text-base font-medium text-blue-950 group-hover:text-blue-600 transition-all duration-300 text-center leading-tight">
                  {feature.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPartnerWithUs;
