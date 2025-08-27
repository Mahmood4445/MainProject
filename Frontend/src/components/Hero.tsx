

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl mx-auto">
        {/* Main Heading */}
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <span className="text-white block sm:inline">Smart </span>
          <span className="text-yellow-300 block sm:inline">Travel Solutions</span>
          <br className="hidden sm:block" />
          <span className="text-white block sm:inline">for a Connected Future.</span>
        </h1>
        
        {/* Description */}
        <p 
          className="text-lg sm:text-xl md:text-2xl text-white/95 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          At GoEasyTrip, we blend advanced technology, global partnerships, and seamless connectivity to deliver reliable travel solutions that help businesses grow with confidence.
        </p>

      </div>
    </section>
  );
};

export default Hero;