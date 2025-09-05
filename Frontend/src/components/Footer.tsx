import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="w-full px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center" data-aos="fade-up">
          {/* Company Info */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <div className="text-2xl font-bold mb-4">
              <span className="text-white">Go</span>
              <span className="text-accent">easy</span>
              <span className="text-white">trip</span>
            </div>
            <div className="text-white/80 text-sm">
              <a 
                href="tel:+6581222240" 
                className="block hover:text-yellow-400 transition-colors duration-300"
              >
                📞 +65 81222240
              </a>
              <a 
                href="tel:+6569097642" 
                className="block hover:text-yellow-400 transition-colors duration-300"
              >
                ☎️ +65 6909 7642
              </a>
              <a 
                href="mailto:mailbox@goeasytrip.com?subject=Inquiry from GoEasyTrip Website&body=Hello GoEasyTrip team,%0D%0A%0D%0AI would like to inquire about your services.%0D%0A%0D%0ABest regards," 
                className="block hover:text-yellow-400 transition-colors duration-300"
              >
                📧 mailbox@goeasytrip.com
              </a>
              <a 
                href="https://maps.google.com/?q=10+Dunlop+St,+Singapore+209340" 
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-yellow-400 transition-colors duration-300"
              >
                📍 10 Dunlop St, Singapore 209340
              </a>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a 
              href="https://www.instagram.com/goeasytrip/#" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://www.facebook.com/goeasytrip/" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="https://www.linkedin.com/company/goeasytrip/?originalSubdomain=sg" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="border-t border-white/20 mt-6 pt-4 text-center text-white/60 text-sm">
          <p>&copy; 2025 GoEasyTrip. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;