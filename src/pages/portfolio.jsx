import React, { useState, useEffect, useRef } from 'react';
import wadhwaevents from '../assets/wadhwaevents.png';
import spsImage from '../assets/sps.png';
import jpImage from '../assets/jp.png';
import mobikooImage from '../assets/mobikoo.png';
import krishchem from '../assets/krishchem.jpg';
import kafila from '../assets/kafila.png';


const PortfolioPage = () => {
  const [isInView, setIsInView] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState(null);
  const projectsRef = useRef(null);
  const filterRef = useRef(null);
  
  // Project data with your actual projects
  const projects = [
    {
      id: 1,
      title: "JPEL Extrusion Tech",
      description: "A sophisticated web application with advanced features for data visualization and interactive user dashboards.",
      category: "Web Development",
      status: "completed",
      image: jpImage,
      technologies: ["React", "D3.js", "Firebase", "Material UI"],
      url: "https://jpel.in/",
      features: [
        "Complex data visualization components",
        "Real-time data updates",
        "User authentication and profiles",
        "Advanced filtering and search capabilities",
        "Responsive layout for all screen sizes"
      ],
      color: "#11C5C6"
    },
    {
      id: 2,
      title: "Wadhwa Events",
      description: "A comprehensive event management platform featuring seamless booking, interactive galleries, and dedicated service showcases.",
      category:  "UI/UX Design",
      status: "completed",
      image: wadhwaevents,
      technologies: ["React", "Node.js", "Tailwind CSS"],
      url: "https://wadhwaevents.com/",
      features: [
        "Modern responsive design with elegant UI/UX",
        "Event booking and management system",
        "Interactive photo gallery",
        "Service showcases with detailed information"
      ],
      color: "#E83A3A"
    },
    {
      id: 3,
      title: "Mobikoo",
      description: "An innovative e-commerce platform for mobile accessories with advanced product filtering and a seamless checkout experience.",
      category: "Web Development",
      status: "completed",
      image: mobikooImage,
      technologies: ["React", "Next.js", "MongoDB", "Stripe"],
      url: "https://mobikoo.com/",
      features: [
        "Dynamic product catalog with advanced filtering",
        "Secure payment integration",
        "User accounts and order tracking",
        "Responsive design for all devices",
        "Admin dashboard for inventory management"
      ],
      color: "#4D61FC"
    },
    {
      id: 4,
      title: "SPS Portfolio",
      description: "A sleek, modern portfolio website showcasing professional services and projects with elegant animations and interactive elements.",
      category: "UI/UX Design",
      status: "completed",
      image: spsImage,
      technologies: ["React", "Framer Motion", "Tailwind CSS"],
      url: "https://sps-self.vercel.app/",
      features: [
        "Smooth scroll animations and transitions",
        "Interactive project showcases",
        "Optimized performance metrics",
        "Contact form integration"
      ],
      color: "#F7B733"
    },
    {
      id: 5,
      title: "Krish Chemicals",
      description: "We developing a professional, responsive website for Krish Chemical, a company specializing in high-quality chemical solutions. The goal is to create a clean, modern digital presence that reflects the company’s industrial reliability and product excellence.",
      category: "Web Development",
      status: "completed",
      image: krishchem,
      technologies: ["React", "Node.js", "MongoDB",],
      url: "https://krishchemusa.com/",
      features: [
      ],
      color: "#11C5C6"
    },
     {
      id: 6,
      title: "Kafila Adventures",
      description: "",
      category: "Web Development",
      status: "completed",
      image: kafila,
      technologies: ["React", "Node.js", "MySQL",],
      url: "https://kafiladventures.com/",
      features: [ 
      ],
      color: "#11C5C6"
    },
    {
      id: 7,
      title: "Prernadip Plastics",
      description: "We are currently designing and developing a modern, responsive website for Prernadip Plastics Private Limited, a trusted name in plastic manufacturing and solutions. The website is being crafted to reflect the company’s industrial strength, product range, and commitment to quality.",
      category: "Web Development",
      status: "in-progress",
      image: "",
      technologies: ["React", "Node.js", "MySQL",],
      url: "",
      features: [ 
      ],
      color: "#11C5C6"
    },
    {
      id: 8,
      title: "JP Spared E-comm",
      description: "",
      category: "Web Development",
      status: "in-progress",
      image: "",
      technologies: ["React", "Node.js", "MongoDB",],
      url: "",
      features: [ 
      ],
      color: "#11C5C6"
    },
  ];
  
  // Filter categories
  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'completed', label: 'Completed' },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'Web Development', label: 'Web Development' },
    { id: 'UI/UX Design', label: 'UI/UX Design' },
    { id: 'SEO & Digital Marketing', label: 'SEO & Digital Marketing' },
  ];
  
  // Update cursor position for magnetic effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Intersection observer for animation
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('portfolio');
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight && position.bottom >= 0) {
          setIsInView(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Filter projects when activeFilter changes
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else if (activeFilter === 'completed' || activeFilter === 'in-progress') {
      setFilteredProjects(projects.filter(project => project.status === activeFilter));
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeFilter));
    }
  }, [activeFilter]);
  
  // Initialize filtered projects with all projects
  useEffect(() => {
    setFilteredProjects(projects);
  }, []);
  
  // Open project details modal
  const openProjectDetails = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };
  
  // Close project details modal
  const closeProjectDetails = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  // Custom cursor component
  const CustomCursor = () => {
    const cursorRef = useRef();
    
    useEffect(() => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`;
      }
    }, [cursorPosition]);
    
    return null; // Simplified for better performance
  };

  // Touch support for filter scrolling
  useEffect(() => {
    const element = filterRef.current;
    if (!element) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    
    const handleTouchStart = (e) => {
      isDown = true;
      startX = e.touches[0].pageX - element.offsetLeft;
      scrollLeft = element.scrollLeft;
    };
    
    const handleTouchMove = (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - element.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed multiplier
      element.scrollLeft = scrollLeft - walk;
    };
    
    const handleTouchEnd = () => {
      isDown = false;
    };
    
    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchmove', handleTouchMove);
    element.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <section id="portfolio" className="py-12 md:py-24 bg-[#0A1828] overflow-hidden">
      <CustomCursor />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 right-0 w-72 md:w-96 h-72 md:h-96 rounded-full bg-[#178582]/5 blur-2xl"></div>
          <div className="absolute bottom-20 left-10 w-60 md:w-80 h-60 md:h-80 rounded-full bg-[#BFA181]/5 blur-3xl"></div>
        </div>
        
        {/* Section header - Mobile responsive improvements */}
        <div className={`relative z-10 mb-12 md:mb-24 transition-all duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
            <div>
              <div className="inline-block mb-3">
                <span className="inline-block py-1 px-3 bg-[#178582]/10 rounded-full text-[#178582] text-sm font-medium mt-[55px]">
                  Our Work
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight">
                Featured <span className="text-[#BFA181]">Projects</span>
              </h2>
              <p className="max-w-2xl text-gray-300 text-base md:text-lg">
                Explore our portfolio of successful projects, 
                each reflecting our commitment to quality, innovation, and attention to detail.
              </p>
            </div>
            
            {/* Stats - Responsive improvements */}
            <div className="flex space-x-6 md:space-x-10 text-right mt-6 md:mt-0">
              <div>
                <span className="block text-2xl md:text-4xl font-bold text-[#BFA181]">{projects.length}</span>
                <span className="text-gray-400 text-xs md:text-sm">Projects</span>
              </div>
              <div>
                <span className="block text-2xl md:text-4xl font-bold text-[#BFA181]">
                  {projects.filter(p => p.status === 'completed').length}
                </span>
                <span className="text-gray-400 text-xs md:text-sm">Completed</span>
              </div>
              <div>
                <span className="block text-2xl md:text-4xl font-bold text-[#BFA181]">
                  {projects.filter(p => p.status === 'in-progress').length}
                </span>
                <span className="text-gray-400 text-xs md:text-sm">Progress</span>
              </div>
            </div>
          </div>
          
          {/* Horizontal line */}
          <div className="mt-8 md:mt-12 h-px w-full bg-gradient-to-r from-transparent via-[#178582]/30 to-transparent"></div>
        </div>
        
        {/* Filter tabs - Improved for mobile */}
        <div 
          ref={filterRef}
          className={`sticky top-0 z-20 bg-[#0A1828]/80 backdrop-blur-md py-3 md:py-4 mb-8 md:mb-12 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
        >
          <div className="flex overflow-x-auto scrollbar-hide gap-2 md:gap-3 pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                  activeFilter === category.id
                    ? 'bg-[#178582] text-white shadow-lg shadow-[#178582]/20'
                    : 'bg-[#0F2336] text-gray-300 hover:bg-[#0F2336]/80 hover:text-white'
                }`}
                onClick={() => setActiveFilter(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Projects showcase with improved mobile layout */}
        <div ref={projectsRef} className="flex flex-col gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className={`w-full transition-all duration-1000 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div 
                className="group relative overflow-hidden rounded-xl md:rounded-2xl border border-[#178582]/10 bg-[#0F2336]/50 backdrop-blur-sm transition-all duration-500 hover:border-[#178582]/30"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => openProjectDetails(project)}
              >
                {/* Project image with responsive height */}
                <div className="relative h-[280px] sm:h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Fixed gradient overlay */}
                  <div 
                    className="absolute inset-0 transition-opacity duration-500 bg-black/50"
                    style={{ 
                      opacity: hoveredProject === project.id ? '0.7' : '0.6',
                    }}
                  ></div>
                  
                  {/* Status badge */}
                  <div className={`absolute top-3 md:top-4 left-3 md:left-4 py-1 px-2 md:px-3 rounded-full text-xs font-medium text-white backdrop-blur-sm ${
                    project.status === 'completed' 
                      ? 'bg-green-500/60' 
                      : 'bg-amber-500/60'
                  }`}>
                    {project.status === 'completed' ? 'Completed' : 'In Progress'}
                  </div>
                  
                  {/* Category badge */}
                  <div className="absolute top-3 md:top-4 right-3 md:right-4 py-1 px-2 md:px-3 rounded-full bg-black/30 text-xs font-medium text-white backdrop-blur-sm">
                    {project.category}
                  </div>
                  
                  {/* Tech tags - Mobile optimized */}
                  <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4 flex flex-wrap gap-1 md:gap-2">
                    {project.technologies.slice(0, window.innerWidth < 640 ? 2 : 3).map((tech) => (
                      <span key={tech} className="text-xs bg-black/30 text-white py-1 px-2 rounded backdrop-blur-sm">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > (window.innerWidth < 640 ? 2 : 3) && (
                      <span className="text-xs bg-black/30 text-white py-1 px-2 rounded backdrop-blur-sm">
                        +{project.technologies.length - (window.innerWidth < 640 ? 2 : 3)} more
                      </span>
                    )}
                  </div>
                  
                  {/* Overlay content - Better for mobile */}
                  <div 
                    className="absolute inset-0 flex flex-col justify-center items-center p-4 md:p-6 text-center transition-all duration-500 bg-black/10 backdrop-blur-sm"
                    style={{
                      opacity: hoveredProject === project.id ? '1' : '0',
                      transform: hoveredProject === project.id ? 'translateY(0)' : 'translateY(10px)',
                    }}
                  >
                    <h3 className="text-xl md:text-3xl font-bold text-white mb-2 text-shadow">{project.title}</h3>
                    <p className="text-white/90 text-sm md:text-lg mb-4 md:mb-6 text-shadow-sm max-w-md">{project.description}</p>
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-white flex items-center justify-center bg-white/10 backdrop-blur-md">
                      <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA section - Mobile improvements */}
        <div className={`mt-16 md:mt-32 transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative rounded-xl md:rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0A1828] via-[#0F2336] to-[#178582]/20"></div>
              <div className="absolute inset-0 backdrop-blur-sm"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 px-6 py-12 md:p-16 flex flex-col md:flex-row items-center">
              <div className="w-full md:w-2/3 mb-8 md:mb-0 md:pr-10">
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">Ready to bring your vision to life?</h3>
                <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8">
                  Let's collaborate to create something exceptional together. Our three-person team is ready to transform your ideas into reality.
                </p>
                
                 <a href="/contact"
                  className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 bg-[#178582] hover:bg-[#178582]/90 text-white font-medium rounded-lg transition-all transform hover:translate-y-[-4px] hover:shadow-xl group"
                 >
                  Start a Project               
                  <svg
                    className="ml-2 w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="w-32 h-32 md:w-56 md:h-56 relative">
                  <div className="w-full h-full rounded-full border-2 border-[#BFA181]/30 animate-spin-slow"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full border-2 border-[#178582]/30 animate-spin-slow-reverse"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 h-3/5 rounded-full border-2 border-white/10 flex items-center justify-center text-white text-base md:text-lg font-bold">
                    Let's Talk
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Project details modal - Mobile optimized */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 md:p-6 backdrop-blur-md overflow-y-auto"
          onClick={closeProjectDetails}
        >
          <div 
            className="bg-[#0F2336] rounded-xl md:rounded-2xl w-full max-w-5xl overflow-hidden relative my-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button - Larger touch target for mobile */}
            <button 
              onClick={closeProjectDetails}
              className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black/90 transition-colors z-20"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal header with image - Responsive height */}
            <div className="relative h-48 sm:h-56 md:h-72 overflow-hidden">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50"></div>
              
              {/* Project title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10">
                <div className="flex flex-wrap justify-between items-end gap-2 md:gap-4">
                  <div>
                    <span className="text-xs md:text-sm py-1 px-2 bg-[#178582]/30 backdrop-blur-sm rounded text-white mb-1 md:mb-2 inline-block">
                      {selectedProject.category}
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white text-shadow">{selectedProject.title}</h2>
                  </div>
                  <div className={`${
                    selectedProject.status === 'completed' 
                      ? 'bg-green-500/70' 
                      : 'bg-amber-500/70'
                  } backdrop-blur-sm py-1 px-2 md:px-3 rounded-full text-xs md:text-sm font-medium text-white`}>
                    {selectedProject.status === 'completed' ? 'Completed' : 'In Progress'}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal content - Responsive grid for mobile */}
            <div className="p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <div className="mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-semibold text-[#BFA181] mb-3 md:mb-4">Project Overview</h3>
                    <p className="text-gray-200 text-base md:text-lg leading-relaxed">{selectedProject.description}</p>
                  </div>
                  
                  <div className="mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-semibold text-[#BFA181] mb-3 md:mb-4">Key Features</h3>
                    <ul className="space-y-3 md:space-y-4 text-gray-200">
                      {selectedProject.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <div 
                            className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 mt-0.5 mr-2 md:mr-3 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${selectedProject.color}44` }}
                          >
                            <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 20 20" fill="currentColor" style={{ color: "#ffffff" }}>
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-sm md:text-base">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <div className="mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-semibold text-[#BFA181] mb-3 md:mb-4">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {selectedProject.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="bg-[#0A1828] text-gray-200 py-1.5 px-3 md:py-2 md:px-4 rounded-lg border border-[#178582]/30 text-sm"
                          style={{ backgroundColor: `${selectedProject.color}22` }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Progress indicator for in-progress projects */}
                  {selectedProject.status === 'in-progress' && (
                    <div className="mb-6 md:mb-8">
                      <h3 className="text-lg md:text-xl font-semibold text-[#BFA181] mb-3 md:mb-4">Completion Status</h3>
                      <div className="w-full bg-[#0A1828] h-4 md:h-6 rounded-full overflow-hidden">
                        <div 
                          className="h-full relative flex items-center justify-center"
                          style={{ 
                            width: `${selectedProject.completion || 50}%`,
                            backgroundColor: selectedProject.color
                          }}
                        >
                          <span className="absolute text-xs font-medium text-white">{selectedProject.completion || 50}%</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs md:text-sm text-gray-400 mt-2">
                        <span>Project Started</span>
                        <span>Target Completion</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Action buttons - Better mobile experience */}
                  <div className="mt-6 md:mt-8 flex flex-col">
                    <a 
                      href={selectedProject.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full px-6 py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl text-center text-white font-medium transition-all transform hover:translate-y-[-4px] hover:shadow-lg flex items-center justify-center"
                      style={{ backgroundColor: selectedProject.color }}
                    >
                      <span>Visit Live Project</span>
                      <svg className="ml-2 w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4m-6-4l6-6m0 0h-6m6 0v6" />
                      </svg>
                    </a>
                    
                    <button 
                      onClick={closeProjectDetails}
                      className="mt-3 md:mt-4 w-full px-6 py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl text-center text-white font-medium transition-all transform hover:translate-y-[-4px] hover:shadow-lg border border-[#178582] hover:bg-[#178582]/20"
                    >
                      Close Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioPage;