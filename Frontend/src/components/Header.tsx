import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import ClickSpark from './ClickSpark';
import PaymentModal from './PaymentModal';
import GoEasyTripLogo from '@/assets/GoEasyTrip logo.png';

interface HeaderProps {
  activeSection?: string;
}

const Header = ({ activeSection = 'home' }: HeaderProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial call

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  const navItems = [
    { name: 'About', href: '#who-we-are', id: 'who-we-are' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Reviews', href: '#reviews', id: 'reviews' },
    { name: 'Milestone', href: '#milestone', id: 'milestone' },
    { name: 'Partners', href: '#partners', id: 'partners' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-blue-50/95 backdrop-blur-md border-b border-blue-200 shadow-lg">
        <div className="w-full px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Smaller on mobile, larger on desktop */}
            <ClickSpark
              sparkColor="#fbbf24"
              sparkSize={8}
              sparkRadius={20}
              sparkCount={6}
              duration={500}
              easing="ease-out"
            >
              <div className="flex items-center cursor-pointer">
                <img 
                  src={GoEasyTripLogo} 
                  alt="GoEasy Trip Logo" 
                  className="h-16 md:h-28 w-auto object-contain"
                />
              </div>
            </ClickSpark>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`transition-all duration-300 font-medium px-3 py-2 rounded-lg ${
                    activeSection === item.id
                      ? 'text-blue-600 bg-blue-100 border border-blue-300'
                      : 'text-blue-950 hover:text-blue-600 hover:bg-blue-100'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Desktop Payment Button */}
            <div className="hidden lg:flex items-center">
              <Button
                onClick={() => setIsPaymentModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <CreditCard size={18} />
                <span>Payment</span>
              </Button>
            </div>

            {/* Mobile Payment Button */}
            <div className="lg:hidden">
              <Button
                onClick={() => setIsPaymentModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <CreditCard size={16} />
                <span className="text-sm">Payment</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Yellow Scroll Progress Bar Below Header */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-gray-200/30 h-1 shadow-lg">
        <div 
          className="h-full bg-yellow-400 transition-all duration-150 ease-out shadow-lg shadow-yellow-400/50"
          style={{ width: `${scrollProgress}%` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent animate-pulse"></div>
      </div>

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
      />

    </>
  );
};

export default Header;