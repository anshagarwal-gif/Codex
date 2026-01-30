import React, { useState, useEffect, useRef } from 'react';
// Images need to be imported correctly or use relative paths
// Using placeholder paths since we don't know the exact structure
import animatedImage from '../assets/animated.webp';
import anshImage from '../assets/ansh.png';
import krishnaImage from '../assets/krishna.png';
import dev from '../assets/Dev.png';
import Darshan from '../assets/Darshan.JPG';

const AboutUsPage = () => {
  const [isInView, setIsInView] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('story');
  const aboutRef = useRef(null);
  
  // Sections for the about page
  const sections = {
    story: {
      title: "Our Story",
      content: "Founded in 2023, DesignStudio began as a collaboration between Three passionate individuals with complementary skills in design and development. What started as freelance projects quickly evolved into a dedicated studio focused on delivering exceptional digital experiences."
    },
    mission: {
      title: "Our Mission",
      content: "We believe in creating digital experiences that not only look beautiful but also drive results. Our mission is to help businesses establish a strong online presence through thoughtful design and robust development solutions."
    },
    approach: {
      title: "Our Approach",
      content: "We take a collaborative approach to every project, working closely with our clients to understand their unique needs and objectives. Our process combines creativity with technical expertise to deliver solutions that exceed expectations."
    }
  };
  
  // Team members data
  const teamMembers = [
    {
      name: "Ansh Agarwal",
      role: "Lead Developer",
      bio: "Ansh has a passion for clean code and innovative solutions, with expertise inbackend technologies that power modern web applications.",
      image: anshImage
    },
    {
      name: "Krushnaraj Bhosale",
      role: "FullStack Developer",
      bio: "Krushnaraj brings a unique perspective to every project and has a Expertise in frontend, focusing on creating intuitive and engaging user experiences.",
      image: krishnaImage
    },
     {
      name: "Dev Sagani",
      role: "UI/UX Developer",
      bio: "UI/UX Designer & Frontend Developer crafting seamless, user-centric digital experiences. Passionate about blending design and code to build intuitive, responsive, and impactful interfaces.",
      image: dev
    },
     {
      name: "Darshan Dorrik",
      role: "UI/UX Developer",
      bio: "Darshan believe every pixel tells a story and every line of code serves a purpose. As a designer-developer hybrid, Drashan create digital narratives that connect brands with their audiences through thoughtful, performance-driven interfaces.",
      image: Darshan
    },
  ];
  // Detect when section is in view
  useEffect(() => {
    const handleScroll = () => {
      if (aboutRef.current) {
        const position = aboutRef.current.getBoundingClientRect();
        if (position.top < window.innerHeight && position.bottom >= 0) {
          setIsInView(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Update mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="about" ref={aboutRef} className="py-24 bg-gradient-to-b from-[#0A1828] to-[#0F2336] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-40 right-0 w-96 h-96 rounded-full bg-[#178582]/5 blur-3xl"
            style={{ 
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
              transition: 'transform 0.5s ease-out'
            }}  
          ></div>
          <div 
            className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[#BFA181]/5 blur-3xl"
            style={{ 
              transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
              transition: 'transform 0.5s ease-out'
            }}  
          ></div>
          <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full border border-[#178582]/5 animate-pulse-slow"></div>
        </div>
        
        {/* Hero section */}
        <div className={`relative mb-20 transition-all duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="inline-block mb-4">
                <span className="inline-block py-1 px-3 bg-[#178582]/10 rounded-full text-[#178582] text-sm font-medium mt-[55px]">
                  About Us
                </span>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                Our <span className="text-[#BFA181]">Mission</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                We're a small, dedicated team passionate about creating exceptional digital experiences that help businesses thrive in the digital world.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-[#0A1828]/50 backdrop-blur-sm rounded-xl p-6 border border-[#178582]/10 transition-transform hover:scale-105">
                  <div className="text-3xl font-bold text-[#BFA181] mb-1">1+</div>
                  <div className="text-gray-400">Years Experience</div>
                </div>
                <div className="bg-[#0A1828]/50 backdrop-blur-sm rounded-xl p-6 border border-[#178582]/10 transition-transform hover:scale-105">
                  <div className="text-3xl font-bold text-[#BFA181] mb-1">5+</div>
                  <div className="text-gray-400">Projects Completed</div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <a 
                  href="/contact" 
                  className="px-6 py-3 bg-[#178582] text-white rounded-lg transition-all hover:bg-[#178582]/90 hover:-translate-y-1 hover:shadow-lg inline-flex items-center"
                >
                  Get in Touch
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <a 
                  href="/portfolio" 
                  className="px-6 py-3 border border-[#BFA181] text-[#BFA181] rounded-lg transition-all hover:bg-[#BFA181]/10 hover:-translate-y-1"
                >
                  View Our Work
                </a>
              </div>
            </div>
            
            <div className="md:w-1/2 relative">
              <div className="relative">
                {/* Main image with animated border */}
                <div 
                  className="rounded-2xl overflow-hidden border-2 border-[#178582]/30 shadow-2xl transition-all duration-500 hover:rotate-0 hover:scale-105"
                  style={{ 
                    transform: `rotate(2deg) translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
                    transition: 'transform 0.5s ease-out'
                  }}
                >
                  <img 
                    src={animatedImage}
                    alt="Our team at work" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1828] to-transparent opacity-60"></div>
                </div>
                
                {/* Floating accent elements */}
                <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-[#BFA181] rounded-lg transform rotate-12 opacity-80"></div>
                <div className="absolute -top-5 -right-5 w-24 h-24 border-4 border-[#178582] rounded-full opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* About sections with tabs */}
        <div className={`relative mb-24 transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Tabs navigation */}
          <div className="flex flex-wrap justify-center space-x-2 mb-12">
            {Object.keys(sections).map((key) => (
              <button
                key={key}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === key
                    ? 'bg-[#178582] text-white shadow-lg shadow-[#178582]/20'
                    : 'bg-[#0F2336] text-gray-300 hover:bg-[#0F2336]/80 hover:text-white'
                }`}
                onClick={() => setActiveTab(key)}
              >
                {sections[key].title}
              </button>
            ))}
          </div>
          
          {/* Active section content */}
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">{sections[activeTab].title}</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              {sections[activeTab].content}
            </p>
          </div>
        </div>
        
        {/* Core values section */}
        <div className={`relative mb-24 transition-all duration-1000 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              These principles guide our work and define how we collaborate with our clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality",
                description: "We're committed to excellence in every aspect of our work, from design to development to client communication.",
                icon: (
                  <svg className="w-8 h-8 text-[#BFA181]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              {
                title: "Innovation",
                description: "We stay at the forefront of design trends and technologies to deliver cutting-edge solutions.",
                icon: (
                  <svg className="w-8 h-8 text-[#BFA181]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )
              },
              {
                title: "Collaboration",
                description: "We work closely with our clients, viewing each engagement as a partnership focused on achieving shared goals.",
                icon: (
                  <svg className="w-8 h-8 text-[#BFA181]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )
              }
            ].map((value, index) => (
              <div 
                key={index}
                className={`bg-[#0F2336]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#178582]/10 hover:border-[#178582]/30 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200 + 700}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#0A1828] flex items-center justify-center">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team section - MODIFIED FOR SMALLER CARDS */}
        <div className={`relative transition-all duration-1000 delay-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12 ">
            <h2 className="text-4xl font-bold text-white mb-4">Meet The Team</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Small but mighty, our three-person team brings complementary skills and a shared passion for excellence.
            </p>
          </div>
          </div>
        
        {/* Team Members Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
                style={{ transitionDelay: `${index * 200 + 400}ms` }}
              >
                <div className="group relative h-full">
                  {/* Card background with gradient border effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#178582]/30 via-[#BFA181]/20 to-transparent rounded-2xl transform group-hover:scale-105 transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>
                  
                  <div className="relative bg-[#0A1828]/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#178582]/20 group-hover:border-[#BFA181]/30 transition-all duration-500 h-full">
                    {/* Top decorative accent */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#178582] to-[#BFA181] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                    
                    <div className="flex flex-col md:flex-row items-center p-6 md:p-8 h-full">
                      {/* Image container with mask and animations */}
                      <div className="w-40 h-40 md:w-48 md:h-48 mb-6 md:mb-0 relative overflow-hidden rounded-full mx-auto md:mx-0 flex-shrink-0">
                        {/* Animated gradient border */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#178582] to-[#BFA181] rounded-full p-1 animate-spin-slow"></div>
                        
                        {/* Image mask */}
                        <div className="absolute inset-1 bg-[#0A1828] rounded-full overflow-hidden flex items-center justify-center">
                          {/* Image with perfect fitting and hover effect */}
                          <div className="w-full h-full overflow-hidden rounded-full transform group-hover:scale-110 transition-all duration-700 bg-center bg-cover relative">
                            <img 
                              src={member.image} 
                              alt={member.name} 
                              className="w-full h-full object-cover object-center absolute inset-0"
                              loading="lazy"
                              style={{ objectPosition: 'center top' }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="md:ml-8 text-center md:text-left flex-grow">
                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#BFA181] transition-colors duration-300">
                          {member.name}
                        </h3>
                        <p className="text-[#178582] font-medium mb-4">{member.role}</p>
                        <p className="text-gray-300 leading-relaxed">
                          {member.bio}
                        </p>
                        
                        {/* Social icons */}
                        <div className="mt-6 flex justify-center md:justify-start space-x-4">
                          {[
                            { name: 'github', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
                            { name: 'linkedin', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                            { name: 'twitter', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' }
                          ].map((social, idx) => (
                            <a 
                              key={idx}
                              href="#" 
                              className="w-10 h-10 rounded-full bg-[#0F2336] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#178582] transform hover:scale-110 transition-all duration-300"
                              aria-label={`${member.name}'s ${social.name}`}
                            >
                              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d={social.icon} />
                              </svg>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default AboutUsPage;