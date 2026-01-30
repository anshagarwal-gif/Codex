import React, { useState, useEffect } from 'react';
import webd from '../assets/webd.webp';
import uiux from '../assets/uiux.png';


const ServicesSection = () => {
  const [activeService, setActiveService] = useState(0);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('services');
      if (element) {
        const position = element.getBoundingClientRect();
        // If section is in viewport
        if (position.top < window.innerHeight && position.bottom >= 0) {
          setIsInView(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Services data
  const services = [
    {
      title: "UI/UX Design",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#BFA181" strokeWidth="2" strokeLinecap="round"/>
          <path d="M8 12L11 15L16 9" stroke="#BFA181" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      description: "We create intuitive, engaging user experiences that delight your audience and achieve your business goals.",
      features: ["User Research", "Wireframing", "Prototyping", "Usability Testing", "Responsive Design"],
      color: "#178582",
      image: webd
    },
    {
      title: "Web Development",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke='#BFA181'>
          <path d="M16 18L22 12L16 6" stroke="#BFA181" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 6L2 12L8 18" stroke="#BFA181" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 4L14 20" stroke="#BFA181" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      description: "We build fast, scalable, and reliable websites and web applications using modern technologies and best practices.",
      features: ["Frontend Development", "Backend Systems", "E-commerce Solutions", "CMS Integration", "Performance Optimization"],
      color: "#BFA181",
      image: uiux
    },
    {
      title: "SEO & Digital Marketing",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#178582">
          <path d="M3 3v18h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 17V9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 17V5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 17v-3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      description: "We boost your online visibility and grow your brand with data-driven SEO strategies and targeted digital marketing campaigns.",
      features: ["Search Engine Optimization", "Content Strategy", "Social Media Marketing", "Analytics & Reporting", "Conversion Optimization"],
      color: "#178582",
      image: webd
    },
  ];
  
  // Auto-rotate through services
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setActiveService(prev => (prev + 1) % services.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [services.length, isInView]);
  
  return (
    <section id="services" className="relative py-24 overflow-hidden bg-gradient-to-b from-[#0A1828] to-[#0F2336]">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#178582]/5 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-[#BFA181]/5 blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 opacity-20">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M43 83.3L83.3 43V0L0 0V83.3L43 83.3Z" fill="#178582" fillOpacity="0.2"/>
            <path d="M83.3 83.3H200V0H83.3V83.3Z" fill="#BFA181" fillOpacity="0.1"/>
            <path d="M83.3 200V83.3H0V200H83.3Z" fill="#BFA181" fillOpacity="0.1"/>
            <path d="M200 200H83.3L83.3 116.7L156.7 116.7L156.7 156.7H200V200Z" fill="#178582" fillOpacity="0.2"/>
          </svg>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header with animated reveal */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-3">
            <span className="inline-block py-1 px-3 bg-[#178582]/10 rounded-full text-[#178582] text-sm font-medium">
              Our Expertise
            </span>
          </div>
          <h2 className="text-5xl font-bold text-white mb-6">
            Services We <span className="text-[#BFA181] relative">
              Deliver
              <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 168 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 5.5C68.5 2 114.5 2.5 166 5.5" stroke="#178582" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg">
            We combine technical expertise with creative thinking to deliver exceptional digital solutions that meet your unique needs.
          </p>
        </div>
        
        {/* Main services showcase */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Service illustration */}
          <div className={`lg:w-1/2 order-2 lg:order-1 transition-all duration-1000 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <div className="relative rounded-2xl overflow-hidden group">
              <div className="aspect-[4/3] bg-[#0A1828] rounded-2xl overflow-hidden relative">
                <img 
                  src={services[activeService].image}
                  alt={services[activeService].title}
                  className="w-full h-full object-cover opacity-80 transition-transform duration-700 transform group-hover:scale-105"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A1828]/80 via-transparent to-[#0F2336]/50"></div>
                
                {/* Decorative elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-64 h-64 rounded-full border-2 border-dashed border-[#178582]/20 animate-spin-slow"
                    style={{ animationDuration: '40s' }}
                  ></div>
                  <div 
                    className="absolute w-48 h-48 rounded-full border-2 border-dashed border-[#BFA181]/20 animate-spin-slow-reverse"
                    style={{ animationDuration: '30s' }}
                  ></div>
                </div>
                
                {/* Service icon */}
                <div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#0A1828]/90 rounded-2xl flex items-center justify-center border border-[#178582]/30 shadow-xl"
                  style={{ boxShadow: `0 0 40px ${services[activeService].color}20` }}
                >
                  <div className="transform scale-150">{services[activeService].icon}</div>
                </div>
                
                {/* Corner patterns */}
                <div className="absolute top-5 left-5 w-16 h-16">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0C0 35.3462 28.6538 64 64 64V0H0Z" fill="#178582" fillOpacity="0.1"/>
                  </svg>
                </div>
                <div className="absolute bottom-5 right-5 w-16 h-16 rotate-180">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0C0 35.3462 28.6538 64 64 64V0H0Z" fill="#BFA181" fillOpacity="0.1"/>
                  </svg>
                </div>
              </div>
              
              {/* Stats overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#0A1828]/90 backdrop-blur-sm px-6 py-4 border-t border-[#178582]/20">
                <div className="flex justify-between items-center">
                  <div className="text-xs font-medium text-[#BFA181]">
                    Success Rate
                    <div className="mt-1 w-24 h-1 bg-[#0F2336] rounded-full overflow-hidden">
                      <div className="h-full bg-[#BFA181] w-[95%]"></div>
                    </div>
                  </div>
                  <div className="text-white text-3xl font-bold">
                    100<span className="text-[#BFA181]">%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Service details */}
          <div className={`lg:w-1/2 order-1 lg:order-2 transition-all duration-1000 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <div className="bg-[#0F2336]/80 backdrop-blur-sm rounded-2xl p-8 border border-[#178582]/20 shadow-xl">
              {/* Service selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {services.map((service, index) => (
                  <button
                    key={index}
                    className={`py-4 px-1 rounded-lg transition-all duration-300 text-center ${
                      activeService === index 
                        ? 'bg-[#178582] text-white shadow-lg shadow-[#178582]/20' 
                        : 'bg-[#0A1828]/50 text-gray-400 hover:bg-[#0A1828]/70 hover:text-gray-300'
                    }`}
                    onClick={() => setActiveService(index)}
                  >
                    <div className="flex flex-col items-center">
                      <div className={`mb-2 ${activeService === index ? 'text-white' : 'text-[#BFA181]'}`}>
                        {service.icon}
                      </div>
                      <h3 className="text-sm font-medium">
                        {service.title.split(' ')[0]}
                      </h3>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Active service content */}
              <div className="space-y-6">
                <div className="flex items-center">
                  <h3 className="text-3xl font-bold text-white">{services[activeService].title}</h3>
                  <div 
                    className="ml-3 w-12 h-1 rounded-full"
                    style={{ backgroundColor: services[activeService].color }}
                  ></div>
                </div>
                
                <p className="text-gray-300 text-lg">
                  {services[activeService].description}
                </p>
                
                <div className="pt-4">
                  <h4 className="text-sm uppercase tracking-wider text-[#BFA181] mb-4">Key Features</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                    {services[activeService].features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <span 
                          className="w-2 h-2 rounded-full mr-3"
                          style={{ backgroundColor: services[activeService].color }}
                        ></span>
                        <span className="text-gray-200">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-8">
                  <a 
                    href="/contact" 
                    className="inline-flex items-center px-6 py-3 bg-[#178582] hover:bg-[#178582]/90 text-white rounded-lg font-medium transition-all transform hover:scale-105 hover:shadow-lg group"
                  >
                    Discuss Your Project
                    <svg 
                      className="ml-2 w-5 h-5 transition-transform duration-300 transform group-hover:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Process section */}
        <div className="mt-28">
          <div className={`text-center mb-12 transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-3xl font-bold text-white mb-4">Our Process</h3>
            <p className="max-w-2xl mx-auto text-gray-300">
              A systematic approach that ensures quality, efficiency, and successful outcomes for every project.
            </p>
          </div>
          
          <div className="relative">
            {/* Process connection line */}
            <div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#178582]/30 to-transparent"></div>
            
            {/* Process steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  number: "01",
                  title: "Discovery",
                  description: "We start by understanding your business, goals, and requirements through in-depth consultation."
                },
                {
                  number: "02",
                  title: "Strategy",
                  description: "We develop a comprehensive plan tailored to your specific needs and objectives."
                },
                {
                  number: "03",
                  title: "Creation",
                  description: "Our three-person team brings the strategy to life through expert design and development."
                },
                {
                  number: "04",
                  title: "Refinement",
                  description: "We test, refine, and optimize to ensure the final product exceeds expectations."
                }
              ].map((step, index) => (
                <div 
                  key={index} 
                  className={`relative transition-all duration-1000 ${
                    isInView 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200 + 500}ms` }}
                >
                  <div className="bg-[#0A1828] rounded-xl p-6 border border-[#178582]/10 h-full transform transition-transform hover:translate-y-[-8px] duration-300">
                    <div className="w-12 h-12 rounded-full bg-[#178582]/10 flex items-center justify-center mb-4 text-[#BFA181] font-bold">
                      {step.number}
                    </div>
                    <h4 className="text-xl font-medium text-white mb-3">{step.title}</h4>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                  
                  {/* Step connector dot */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0A1828] border-2 border-[#178582] z-10 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className={`mt-28 transition-all duration-1000 delay-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-[#0F2336]/80 rounded-2xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#178582]/5 rounded-full blur-3xl -translate-x-12 -translate-y-12"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#BFA181]/5 rounded-full blur-3xl translate-x-12 translate-y-12"></div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <h3 className="text-3xl font-bold text-white mb-4">Ready to transform your digital presence?</h3>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl">
                Let's collaborate to create something exceptional together. Our personalized approach ensures that your unique needs and goals are always the priority.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="px-8 py-4 bg-[#178582] text-white font-medium rounded-lg transition-all transform hover:scale-105 hover:shadow-lg group"
                >
                  Start Your Project
                  <svg 
                    className="ml-2 w-5 h-5 inline transition-transform duration-300 transform group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <a 
                  href="/portfolio" 
                  className="px-8 py-4 border border-[#BFA181] text-[#BFA181] font-medium rounded-lg transition-all hover:bg-[#BFA181]/10 transform hover:scale-105"
                >
                  View Our Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;