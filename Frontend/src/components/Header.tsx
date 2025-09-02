import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import ClickSpark from './ClickSpark';
import GoEasyTripLogo from '@/assets/GoEasyTrip logo.png';

interface HeaderProps {
  activeSection?: string;
}

const Header = ({ activeSection = 'home' }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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
            {/* Logo */}
            <ClickSpark
              sparkColor="#fbbf24"
              sparkSize={8}
              sparkRadius={20}
              sparkCount={6}
              duration={500}
              easing="ease-out"
            >
              <div className="flex items-center ml-8 cursor-pointer">
                <img 
                  src={GoEasyTripLogo} 
                  alt="GoEasy Trip Logo" 
                  className="h-28 w-auto object-contain"
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

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-blue-950 hover:text-blue-600 hover:bg-blue-100"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 px-4 border-t border-blue-200 bg-blue-50/95 backdrop-blur-md">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`transition-all duration-300 font-medium px-3 py-2 rounded-lg ${
                      activeSection === item.id
                        ? 'text-blue-600 bg-blue-100 border border-blue-300'
                        : 'text-blue-950 hover:text-blue-600 hover:bg-blue-100'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          )}
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

    </>
  );
};

export default Header;