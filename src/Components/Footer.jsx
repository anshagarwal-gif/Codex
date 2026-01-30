import React, { useState, useEffect, useRef } from 'react';

const AnimatedFooter = () => {
  const [isInView, setIsInView] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredLink, setHoveredLink] = useState(null);
  const footerRef = useRef(null);
  const cursorRef = useRef(null);
  
  // Detect when footer is in view
  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setIsInView(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Track mouse position for interactive effects
  useEffect(() => { 
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Update custom cursor position if footer is hovered
      if (cursorRef.current && footerRef.current) {
        const footerRect = footerRef.current.getBoundingClientRect();
        if (
          e.clientX >= footerRect.left &&
          e.clientX <= footerRect.right &&
          e.clientY >= footerRect.top &&
          e.clientY <= footerRect.bottom
        ) {
          cursorRef.current.style.opacity = '1';
          cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        } else {
          cursorRef.current.style.opacity = '0';
        }
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Social media links
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/anshagarwal-gif', icon: 'github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ansh-agarwal-7275b2249/', icon: 'linkedin' },
    { name: 'Instagram', url: 'https://www.instagram.com/anshagarwal__007/?next=%2F&hl=en', icon: 'instagram' },
  ];
  
  // Navigation links
  const navLinks = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/aboutus' },
    { name: 'Services', url: '/Home#services' },
    { name: 'Portfolio', url: '/portfolio' },
    { name: 'Contact', url: '/contact' }
  ];

  // Function to render social icons
  const renderSocialIcon = (icon) => {
    switch (icon) {
      case 'github':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        );
      case 'linkedin':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        );
      case 'twitter':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
          </svg>
        );
      case 'instagram':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        );
      case 'dribbble':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer ref={footerRef} className="relative bg-[#0A1828] pt-24 pb-10 overflow-hidden z-10">
      {/* Custom cursor */}
      <div 
        ref={cursorRef}
        className="fixed w-6 h-6 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference" 
        style={{ 
          background: hoveredLink ? '#fff' : 'transparent',
          transition: 'transform 0.1s, opacity 0.3s, width 0.3s, height 0.3s',
          opacity: 0,
          width: hoveredLink ? '48px' : '24px',
          height: hoveredLink ? '48px' : '24px'
        }}
      ></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div 
          className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#178582]/10 blur-3xl"
          style={{ 
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: 'transform 0.5s ease-out'
          }}  
        ></div>
        <div 
          className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-[#BFA181]/10 blur-3xl"
          style={{ 
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
            transition: 'transform 0.5s ease-out'
          }}  
        ></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                backgroundColor: i % 3 === 0 ? '#178582' : i % 3 === 1 ? '#BFA181' : '#ffffff',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1,
                animationDuration: `${Math.random() * 10 + 15}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 bg-grid-pattern opacity-5"
          style={{ 
            transform: `translate(${mousePosition.x * -0.005}px, ${mousePosition.y * -0.005}px)`,
            transition: 'transform 1s ease-out'
          }}  
        ></div>
      </div>
    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Logo & contact info */}
        <div className={`flex flex-col lg:flex-row gap-10 lg:gap-20 mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="lg:w-1/3">
            <div className="flex items-center mb-6">
              <img
                src={`${process.env.PUBLIC_URL}/LOGO.png`}
                alt="Codex"
                className="h-24 w-auto mr-4 object-contain mix-blend-multiply"
              />
              <div>
                <h3 className="text-white font-bold text-xl tracking-tight">
                  <span className="text-[#178582]">Codex</span>
                </h3>
                <p className="text-gray-400 text-sm">Web · UI/UX · SEO & Digital Marketing</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6">
              We create stunning digital experiences that captivate audiences and drive business growth. 
              Our three-person team brings a unique blend of creativity and technical expertise.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-300 hover:text-[#178582] transition-colors duration-300">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>bhosalekrushnaraj@gmail.com</span>
              </div>
              <div className="flex items-center text-gray-300 hover:text-[#178582] transition-colors duration-300">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+91 7385410360</span>
              </div>
            </div>
          </div>
          
          {/* Navigation links */}
          <div className="lg:w-1/3">
            <h3 className="text-white font-semibold text-xl mb-6 inline-flex items-center">
              <span className="w-8 h-px bg-[#178582] mr-3"></span>
              Navigation
            </h3>
            
            <ul className="grid grid-cols-2 gap-4">
              {navLinks.map((link, index) => (
                <li 
                  key={index}
                  className={`transition-all duration-500 transform ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <a 
                    href={link.url}
                    className="text-gray-300 hover:text-[#BFA181] transition-colors duration-300 group flex items-center"
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <span className="w-0 h-px bg-[#BFA181] transition-all duration-300 mr-0 group-hover:w-6 group-hover:mr-2"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter signup */}
          <div className="lg:w-1/3">
            <h3 className="text-white font-semibold text-xl mb-6 inline-flex items-center">
              <span className="w-8 h-px bg-[#178582] mr-3"></span>
              Stay Updated
            </h3>
            
            <p className="text-gray-300 mb-6">
              Give Star to Our Git-Repository
            </p>
            
            <form className="relative mb-8">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-[#0F2336] border border-[#178582]/20 text-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-[#178582] transition-colors"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#178582] text-white p-2 rounded-md hover:bg-[#178582]/90 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
            
            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.url}
                  className={`w-10 h-10 rounded-full bg-[#0F2336] text-gray-300 flex items-center justify-center border border-[#178582]/20 hover:text-[#BFA181] hover:border-[#BFA181]/30 transition-all duration-300 transform ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                  style={{ transitionDelay: `${index * 100 + 500}ms` }}
                  onMouseEnter={() => setHoveredLink(social.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {renderSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Animated divider */}
        <div className="relative h-px w-full overflow-hidden mb-10">
          <div 
            className={`absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-[#178582] to-transparent transition-all duration-1000 ease-in-out ${isInView ? 'w-full' : 'w-0'}`}
            style={{ transitionDelay: '400ms' }}
          ></div>
        </div>
        
        {/* Copyright & back to top */}
        <div className={`flex flex-col md:flex-row justify-between items-center transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '600ms' }}>
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Codex. All rights reserved.
          </div>
          
          <div className="flex items-center">
            <span className="text-gray-400 text-sm mr-4">Made with passion</span>
            
            <a 
              href="#top" 
              className="w-10 h-10 rounded-full bg-[#0F2336] border border-[#178582]/30 flex items-center justify-center text-[#178582] hover:text-white hover:bg-[#178582] transition-all duration-300 transform hover:-translate-y-1"
              onMouseEnter={() => setHoveredLink('top')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        .bg-grid-pattern {
          background-size: 20px 20px;
          background-image: linear-gradient(to right, #178582 1px, transparent 1px),
                            linear-gradient(to bottom, #178582 1px, transparent 1px);
        }
      `}</style>
    </footer>
  );
};

export default AnimatedFooter;