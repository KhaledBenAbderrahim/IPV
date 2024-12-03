import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (location.pathname !== '/') {
      navigate('/#' + sectionId);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50"
    >
      <div className={`backdrop-blur-md transition-all duration-300 ${
        isScrolled ? 'bg-white/80 shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="group flex items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-lg opacity-30 group-hover:opacity-40 transition-opacity" />
                <GraduationCap className="relative h-10 w-10 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                EduMaster Pro
              </span>
            </Link>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-1">
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
                
                <div className="w-px h-6 bg-gray-200 mx-4" />
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/login')} 
                  className="px-5 py-2.5 rounded-xl text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Login
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/register')} 
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white px-5 py-2.5 rounded-xl font-medium transition-opacity shadow-lg shadow-primary/25"
                >
                  Register
                </motion.button>
              </div>
            </div>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-dark" />
              ) : (
                <Menu className="h-6 w-6 text-dark" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
          >
            <div className="bg-white/80 backdrop-blur-md px-4 pt-2 pb-3 shadow-lg">
              <div className="space-y-1">
                <MobileNavButton onClick={() => {
                  scrollToSection('features');
                  setIsOpen(false);
                }}>
                  Features
                </MobileNavButton>
                <MobileNavButton onClick={() => {
                  scrollToSection('about');
                  setIsOpen(false);
                }}>
                  About
                </MobileNavButton>
                <MobileNavButton onClick={() => {
                  scrollToSection('testimonials');
                  setIsOpen(false);
                }}>
                  Testimonials
                </MobileNavButton>
                <MobileNavButton onClick={() => {
                  scrollToSection('pricing');
                  setIsOpen(false);
                }}>
                  Pricing
                </MobileNavButton>
                
                <div className="pt-4 space-y-2">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      navigate('/login');
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-3 rounded-xl border-2 border-primary/10 text-primary font-medium hover:bg-primary/5 transition-colors"
                  >
                    Login
                  </motion.button>
                  
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      navigate('/register');
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
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

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      to={href}
      className="group relative px-4 py-2 text-dark/80 hover:text-dark transition-colors"
    >
      <span>{children}</span>
      <span className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}

function NavButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="group relative px-4 py-2 text-dark/80 hover:text-dark transition-colors"
    >
      <span className="flex items-center">
        {children}
        <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform" />
      </span>
      <span className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      to={href}
      onClick={onClick}
      className="block px-4 py-3 rounded-lg text-dark/80 hover:text-dark hover:bg-gray-100 transition-colors"
    >
      {children}
    </Link>
  );
}

function MobileNavButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center px-4 py-3 rounded-lg text-dark/80 hover:text-dark hover:bg-gray-100 transition-colors"
    >
      <span>{children}</span>
      <ChevronDown className="ml-1 h-4 w-4" />
    </button>
  );
}