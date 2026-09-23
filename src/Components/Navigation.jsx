import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  // Handle scroll effect for navigation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);
  
  // Navigation links - full list for desktop
  const navLinks = [
    { id: '/', label: 'Home' },
    { id: '/Home#services', label: 'Skills' },
    { id: '/portfolio', label: 'Portfolio' },
    { id: '/aboutus', label: 'About' },
  ];
  
  // Mobile navigation links - including services now
  const mobileNavLinks = navLinks;
  
  // Scroll to section handler
  const scrollToSection = useCallback((sectionId) => {
    // Remove the # if present
    const id = sectionId.replace('#', '');
    
    // Try multiple selector approaches - sometimes the ID might be on different elements
    const section = 
      document.getElementById(id) || 
      document.querySelector(`[id="${id}"]`) || 
      document.querySelector(`[data-section="${id}"]`) ||
      document.querySelector(`section[data-id="${id}"]`);
    
    if (section) {
      // Calculate position with offset for header
      const headerOffset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      // Scroll to the position
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // For mobile, close the menu after navigating
      setIsMobileMenuOpen(false);
      return true;
    }
    
    setIsMobileMenuOpen(false);
    return false;
  }, []);

  // After navigating to a route that carries a #hash, scroll to that section
  // once the target page has actually mounted.
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const timer = setTimeout(() => scrollToSection(id), 100);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.hash, scrollToSection]);

  // Handle link click with proper navigation logic
  const handleLinkClick = useCallback((e, link) => {
    e.preventDefault();
    setActiveLink(link.id);
    setIsMobileMenuOpen(false);

    const [path, hash] = link.id.split('#');
    const targetPath = path || '/';
    const isHomeTarget = targetPath === '/' || targetPath === '/Home';
    const onHomeRoute = location.pathname === '/' || location.pathname === '/Home';

    if (hash && isHomeTarget && onHomeRoute) {
      // Already on the home page - just scroll, no navigation needed
      scrollToSection(hash);
    } else {
      navigate(hash ? `${targetPath}#${hash}` : targetPath);
    }
  }, [navigate, location.pathname, scrollToSection]);
  
  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-2 bg-[#0A1828]/90 backdrop-blur-md shadow-lg' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center min-w-0">
            <a href="/" onClick={(e) => handleLinkClick(e, { id: '/' })} className="flex items-center min-w-0">
              <div className="w-9 h-9 sm:w-11 sm:h-11 mr-2.5 sm:mr-3 rounded-lg bg-gradient-to-br from-[#178582] to-[#0d4f4d] flex items-center justify-center text-white font-bold text-sm sm:text-base shrink-0">
                AA
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[#178582] font-bold text-base sm:text-xl tracking-tight leading-tight whitespace-nowrap">
                  Ansh Agarwal
                </span>
                <span className="hidden sm:block text-gray-400 text-sm font-normal mt-0.5 whitespace-nowrap">
                  Java Full Stack Developer
                </span>
              </div>
            </a>
          </div>
          
          {/* Desktop Navigation - includes Services */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map(link => (
              <a 
                key={link.id}
                href={link.id}
                className={`relative px-1 py-2 text-sm font-medium transition-colors duration-300 group ${
                  activeLink === link.id 
                    ? 'text-[#178582]' 
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={(e) => handleLinkClick(e, link)}
              >
                {link.label}
                <span 
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#178582] transform origin-left transition-transform duration-300 ${
                    activeLink === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                ></span>
              </a>
            ))}
            
            {/* CTA Button */}
            <a 
              href="/contact"
              className="ml-4 px-5 py-2 bg-[#178582] text-white rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 border border-transparent hover:border-[#BFA181]"
            >
              Get in Touch
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center shrink-0">
            <button 
              className="inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-6 h-6 relative">
                <span 
                  className={`absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                  }`}
                ></span>
                <span 
                  className={`absolute h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'w-0 opacity-0' : 'w-full opacity-100'
                  }`}
                ></span>
                <span 
                  className={`absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${
                    isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu - now including Services */}
      <div
        className={`md:hidden fixed inset-x-0 top-0 bottom-0 z-40 bg-[#0A1828] overflow-y-auto transition-opacity duration-300 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-24 pb-4 space-y-1 sm:px-3">
          {mobileNavLinks.map(link => (
            <a
              key={link.id}
              href={link.id}
              className={`block px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                activeLink === link.id
                  ? 'text-[#178582] bg-[#178582]/10'
                  : 'text-gray-300 hover:text-white hover:bg-[#178582]/5'
              }`}
              onClick={(e) => handleLinkClick(e, link)}
            >
              {link.label}
            </a>
          ))}
          
          {/* Mobile CTA */}
          <div className="pt-2">
            <a
              href="/contact"
              className="block w-full text-center px-5 py-3 bg-[#178582] text-white rounded-lg shadow-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0A1828]/50">
        <div 
          className="h-full bg-gradient-to-r from-[#178582] to-[#BFA181] transition-all duration-300"
          style={{ 
            width: `${Math.min(
              (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 
              100
            )}%` 
          }}
        ></div>
      </div>
    </nav>
  );
};

export default Navigation;