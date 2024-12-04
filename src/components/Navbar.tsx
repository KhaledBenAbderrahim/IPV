import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NavButton = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="px-3 sm:px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 text-sm sm:text-base font-medium transition-all"
  >
    {children}
  </motion.button>
);

const MobileNavButton = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
  <motion.button
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100/70 text-left text-base font-medium transition-all active:bg-gray-200/50"
  >
    {children}
  </motion.button>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show navbar on dashboard pages
  if (location.pathname.includes('dashboard') || 
      location.pathname === '/login' || 
      location.pathname === '/register' ||
      location.pathname === '/exam') {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const scrollToElement = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = window.innerWidth < 768 ? 60 : 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scrollToElement, 500);
    } else {
      scrollToElement();
    }
  };

  const handleMobileNavClick = (sectionId: string) => {
    setIsOpen(false);
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 100);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 ${isOpen ? 'bg-white' : ''}`}
    >
      <div className={`backdrop-blur-md transition-all duration-300 ${
        isScrolled || isOpen ? 'bg-white/90 shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="group flex items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-lg opacity-30 group-hover:opacity-40 transition-opacity" />
                <GraduationCap className="relative h-8 w-8 sm:h-10 sm:w-10 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <span className="ml-2 sm:ml-3 text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                EduMaster Pro
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                <NavButton onClick={() => scrollToSection('features')}>
                  Features
                </NavButton>
                <NavButton onClick={() => scrollToSection('about')}>
                  About
                </NavButton>
                <NavButton onClick={() => scrollToSection('testimonials')}>
                  Testimonials
                </NavButton>
                <NavButton onClick={() => scrollToSection('pricing')}>
                  Pricing
                </NavButton>
                
                <div className="w-px h-5 bg-gray-200 mx-3" />
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/login')} 
                  className="px-4 py-2 rounded-lg text-primary hover:text-primary/80 text-sm font-medium transition-all hover:bg-primary/5"
                >
                  Login
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/register')} 
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all active:shadow-sm shadow-md shadow-primary/20"
                >
                  Register
                </motion.button>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all active:bg-gray-200"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? 'close' : 'menu'}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? (
                    <X className="h-5 w-5 text-gray-600" />
                  ) : (
                    <Menu className="h-5 w-5 text-gray-600" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
          >
            <div className="bg-white/95 backdrop-blur-md px-4 pt-2 pb-4 shadow-xl border-t border-gray-100">
              <div className="space-y-1">
                <MobileNavButton onClick={() => handleMobileNavClick('features')}>
                  Features
                </MobileNavButton>
                <MobileNavButton onClick={() => handleMobileNavClick('about')}>
                  About
                </MobileNavButton>
                <MobileNavButton onClick={() => handleMobileNavClick('testimonials')}>
                  Testimonials
                </MobileNavButton>
                <MobileNavButton onClick={() => handleMobileNavClick('pricing')}>
                  Pricing
                </MobileNavButton>
                
                <div className="pt-4 space-y-2">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      navigate('/login');
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-primary/5 text-primary font-medium transition-all active:bg-primary/10 hover:bg-primary/8"
                  >
                    Login
                  </motion.button>
                  
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      navigate('/register');
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium transition-all active:opacity-90 shadow-lg shadow-primary/20"
                  >
                    Register
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}