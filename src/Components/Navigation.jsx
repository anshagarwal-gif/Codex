import React, { useState, useEffect, useCallback } from 'react';

const Navigation = () => {
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
  
  // Navigation links - full list for desktop
  const navLinks = [
    { id: '/', label: 'Home' },
    { id: '/Home#services', label: 'Services' },
    { id: '/portfolio', label: 'Portfolio' },
    { id: '/aboutus', label: 'About Us' },
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
    
    // If section not found, try setting window.location.hash as fallback
    window.location.hash = id;
    setIsMobileMenuOpen(false);
    return false;
  }, []);
  
  // Handle link click with proper navigation logic
  const handleLinkClick = useCallback((e, link) => {
    // Update active state
    setActiveLink(link.id);
    
    // If it's a hash link, prevent default and handle custom scrolling
    if (link.id.startsWith('#')) {
      e.preventDefault();
      scrollToSection(link.id);
    } else {
      // For regular links, close mobile menu but allow default navigation
      setIsMobileMenuOpen(false);
    }
  }, [scrollToSection]);
  
  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-2 bg-[#0A1828]/90 backdrop-blur-md shadow-lg' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img
                src={`${process.env.PUBLIC_URL}/LOGO.png`}
                alt="Codex"
                className="h-24 w-auto mr-3 object-contain mix-blend-multiply"
              />
              <div className="flex flex-col">
                <span className="text-[#178582] font-bold text-xl tracking-tight leading-tight">
                  Codex
                </span>
                <span className="text-gray-400 text-sm font-normal mt-0.5">
                  Web · UI/UX · SEO & Digital Marketing
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
          <div className="md:hidden flex items-center">
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
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-4 bg-[#0A1828]/95 backdrop-blur-md space-y-1 sm:px-3 border-t border-[#178582]/20">
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