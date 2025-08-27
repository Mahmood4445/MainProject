import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import ClickSpark from './ClickSpark';

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
      <header className="fixed top-0 left-0 right-0 z-50 bg-blue-950/95 backdrop-blur-md border-b border-blue-800 shadow-lg">
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
                <div className="text-2xl font-bold">
                  <span className="text-blue-300">company</span>
                  <span className="text-yellow-400">logo</span>
                  <span className="text-blue-300"></span>
                </div>
              </div>
            </ClickSpark>

            {/* Payment Button - Top Right */}
            <ClickSpark
              sparkColor="#ef4444"
              sparkSize={6}
              sparkRadius={15}
              sparkCount={4}
              duration={400}
              easing="ease-in-out"
            >
              <button
                className="bg-yellow-300 text-blue-950 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-200 hover:shadow-lg transition-all duration-200"
                onClick={() => window.open('https://your-payment-portal.com', '_blank')}
              >
                Payment
              </button>
            </ClickSpark>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`transition-all duration-300 font-medium px-3 py-2 rounded-lg ${
                    activeSection === item.id
                      ? 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20'
                      : 'text-white hover:text-yellow-400 hover:bg-white/5'
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
                className="text-white hover:text-yellow-400 hover:bg-white/5"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 px-4 border-t border-blue-800 bg-blue-950/95 backdrop-blur-md">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`transition-all duration-300 font-medium px-3 py-2 rounded-lg ${
                      activeSection === item.id
                        ? 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20'
                        : 'text-white hover:text-yellow-400 hover:bg-white/5'
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
      
      {/* Increment Line Below Header - Now Shows Scroll Progress */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-slate-900/30 h-1 shadow-lg">
        <div 
          className="h-full bg-gradient-to-r from-cyan-400 via-yellow-300 to-pink-400 transition-all duration-150 ease-out shadow-lg shadow-cyan-400/50"
          style={{ width: `${scrollProgress}%` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/30 to-transparent animate-pulse"></div>
      </div>
    </>
  );
};

export default Header;