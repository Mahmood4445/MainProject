import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="w-full px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center" data-aos="fade-up">
          {/* Company Info */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <div className="text-2xl font-bold mb-2">
              <span className="text-white">aaaa</span>
              <span className="text-accent">aa</span>
              <span className="text-white">aa</span>
            </div>
            <div className="text-white/80 text-sm">
              <p>📞 +1234567890</p>
              <p>📧 info@example.com</p>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a 
              href="#" 
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="#" 
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