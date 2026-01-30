import React, { useEffect, useState } from 'react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const fullText = "We craft digital experiences that elevate brands";
  const typeSpeed = 50;
  
  useEffect(() => {
    setIsVisible(true);
    
    // Parallax effect
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Typing effect
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, typeSpeed);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(typingInterval);
    };
  }, []);

  // Staggered animations for text elements
  const staggerItems = [
    { delay: 0, element: 'tagline' },
    { delay: 300, element: 'headline' },
    { delay: 600, element: 'description' },
    { delay: 900, element: 'buttons' }
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0A1828] overflow-hidden">
      {/* Animated floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full opacity-20 animate-float"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              backgroundColor: i % 3 === 0 ? '#178582' : i % 3 === 1 ? '#BFA181' : '#ffffff',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Animated background elements with parallax */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#178582]/10 blur-3xl animate-pulse transition-transform duration-300 ease-out"
          style={{ 
            transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
            animationDuration: '8s'
          }}
        ></div>
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#BFA181]/10 blur-3xl animate-pulse transition-transform duration-300 ease-out" 
          style={{ 
            transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px)`,
            animationDuration: '12s',
            animationDelay: '1s'
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#178582]/5 blur-3xl animate-pulse transition-transform duration-300 ease-out" 
          style={{ 
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) scale(${1 + mousePosition.x * 0.1})`,
            animationDuration: '15s',
            animationDelay: '2s'
          }}
        ></div>
      </div>
      
      {/* Animated grid overlay */}
      <div 
        className="absolute inset-0 bg-grid-pattern opacity-10 transition-transform duration-500 ease-out"
        style={{ transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)` }}
      ></div>
      
      {/* Content container with staggered animation */}
      <div className={`relative z-10 max-w-6xl w-full px-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Text content with staggered animation */}
          <div className="md:w-3/5 space-y-6">
            <div 
              className={`inline-block transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${staggerItems[0].delay}ms` }}
            >
              <span className="text-lg font-light text-[#178582] tracking-wide pb-2 relative overflow-hidden inline-block">
                <span className="relative z-10 animate-shimmer bg-gradient-to-r from-[#178582] via-teal-300 to-[#178582] bg-clip-text text-transparent bg-[length:200%_100%]">
                 THREE MINDS,UNLIMITED CREATIVITY
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#178582] animate-expand"></span>
              </span>
            </div>
            
            <h1 
              className={`text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${staggerItems[1].delay}ms` }}
            >
              {typedText.split(' ').map((word, index) => (
                <span key={index}>
                  {index === 2 ? <span className="text-[#BFA181] inline-block animate-float" style={{animationDuration: '5s'}}>{word}</span> : word}
                  {' '}
                </span>
              ))}
              <span className="animate-blink">|</span>
            </h1>
            
            <p 
              className={`text-xl text-gray-300 max-w-2xl transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${staggerItems[2].delay}ms` }}
            >
              A three-person studio delivering bespoke design and development solutions that combine creativity with technical excellence.
            </p>
            
            <div 
              className={`flex flex-wrap gap-4 pt-4 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${staggerItems[3].delay}ms` }}
            >
              <a href='/portfolio' className="group px-8 py-4 bg-[#178582] text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg overflow-hidden relative">
                <span className="relative z-10">View Our Work</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#178582] to-teal-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </a>
              <a href='/contact' className="group px-8 py-4 border border-[#BFA181] text-[#BFA181] font-medium rounded-lg transition-all duration-300 relative overflow-hidden">
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Contact Us</span>
                <span className="absolute inset-0 bg-[#BFA181] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            </div>
          </div>
          
          {/* Visual element with advanced animations */}
          <div 
            className={`md:w-2/5 relative transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div 
              className="w-full aspect-square relative rounded-2xl overflow-hidden bg-[#0A1828] border border-[#178582]/20 shadow-2xl"
              style={{ 
                transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px) rotate(${mousePosition.x * 2}deg)`,
                transition: 'transform 0.3s ease-out'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 relative">
                  {/* 3D rotating cube effect */}
                  <div className="absolute w-32 h-32 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-cube-rotate perspective-1000">
                    <div className="absolute w-full h-full bg-[#178582]/30 rotate-cube-front"></div>
                    <div className="absolute w-full h-full bg-[#BFA181]/30 rotate-cube-back"></div>
                    <div className="absolute w-full h-full bg-[#178582]/50 rotate-cube-right"></div>
                    <div className="absolute w-full h-full bg-[#BFA181]/50 rotate-cube-left"></div>
                    <div className="absolute w-full h-full bg-[#178582]/40 rotate-cube-top"></div>
                    <div className="absolute w-full h-full bg-[#BFA181]/40 rotate-cube-bottom"></div>
                  </div>
                  
                  {/* Animated orbital rings */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64">
                    <div className="absolute inset-0 border-2 border-dashed border-[#178582]/30 rounded-full animate-spin-slow"></div>
                    <div className="absolute inset-0 border-2 border-dashed border-[#BFA181]/30 rounded-full animate-spin-slow-reverse" style={{animationDuration: '30s'}}></div>
                    
                    {/* Orbital particles */}
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute w-3 h-3 rounded-full bg-[#178582] animate-orbit"
                        style={{
                          animationDelay: `${i * 2}s`,
                          left: '50%',
                          top: '50%',
                        }}
                      ></div>
                    ))}
                    
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i + 5}
                        className="absolute w-3 h-3 rounded-full bg-[#BFA181] animate-orbit-reverse"
                        style={{
                          animationDelay: `${i * 2}s`,
                          left: '50%',
                          top: '50%',
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Interactive overlay texture */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-[#0A1828]/0 to-[#0A1828]/60 transition-opacity duration-300"
                style={{ opacity: 0.5 + mousePosition.y * 0.5 }}
              ></div>
            </div>
            
            {/* Floating label with bounce animation */}
            <div 
              className="absolute -bottom-6 right-6 bg-[#0A1828] text-[#BFA181] px-6 py-3 rounded-lg shadow-lg border border-[#BFA181]/20 transform rotate-3 hover:rotate-0 transition-all hover:scale-110 duration-300 animate-float-slow"
              style={{animationDuration: '6s'}}
            >
              <span className="font-semibold">Est. 2024</span>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator with pulse animation */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce-slow">
          
          <div className="w-px h-16 bg-gradient-to-b from-white/0 to-white/50"></div>
          <div className="w-6 h-6 flex items-center justify-center">
            <svg className="animate-bounce" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add these custom animations to your tailwind.config.js
const customAnimations = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
  @keyframes float-slow {
    0%, 100% { transform: translateY(0) rotate(3deg); }
    50% { transform: translateY(-10px) rotate(3deg); }
  }
  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: 0 0; }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  @keyframes expand {
    0% { width: 0; }
    100% { width: 100%; }
  }
  @keyframes spin-slow {
    to { transform: rotate(360deg); }
  }
  @keyframes spin-slow-reverse {
    to { transform: rotate(-360deg); }
  }
  @keyframes cube-rotate {
    0% { transform: rotateX(0) rotateY(0); }
    100% { transform: rotateX(360deg) rotateY(360deg); }
  }
  @keyframes orbit {
    from { transform: rotate(0deg) translateX(100px) rotate(0deg); }
    to { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
  }
  @keyframes orbit-reverse {
    from { transform: rotate(0deg) translateX(70px) rotate(0deg); }
    to { transform: rotate(-360deg) translateX(70px) rotate(360deg); }
  }
`;

// These classes should be added to your tailwind.config.js
const customClasses = {
  '.animate-float': {
    animation: 'float 6s ease-in-out infinite'
  },
  '.animate-float-slow': {
    animation: 'float-slow 6s ease-in-out infinite'
  },
  '.animate-bounce-slow': {
    animation: 'bounce-slow 4s ease-in-out infinite'
  },
  '.animate-shimmer': {
    animation: 'shimmer 3s ease-in-out infinite'
  },
  '.animate-blink': {
    animation: 'blink 0.8s step-end infinite'
  },
  '.animate-expand': {
    animation: 'expand 3s ease-out forwards'
  },
  '.animate-spin-slow': {
    animation: 'spin-slow 20s linear infinite'
  },
  '.animate-spin-slow-reverse': {
    animation: 'spin-slow-reverse 20s linear infinite'
  },
  '.animate-cube-rotate': {
    animation: 'cube-rotate 20s linear infinite'
  },
  '.perspective-1000': {
    perspective: '1000px'
  },
  '.rotate-cube-front': {
    transform: 'translateZ(16px)'
  },
  '.rotate-cube-back': {
    transform: 'rotateY(180deg) translateZ(16px)'
  },
  '.rotate-cube-right': {
    transform: 'rotateY(90deg) translateZ(16px)'
  },
  '.rotate-cube-left': {
    transform: 'rotateY(-90deg) translateZ(16px)'
  },
  '.rotate-cube-top': {
    transform: 'rotateX(90deg) translateZ(16px)'
  },
  '.rotate-cube-bottom': {
    transform: 'rotateX(-90deg) translateZ(16px)'
  },
  '.animate-orbit': {
    animation: 'orbit 15s linear infinite'
  },
  '.animate-orbit-reverse': {
    animation: 'orbit-reverse 12s linear infinite'
  }
};

export default HeroSection;