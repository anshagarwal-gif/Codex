import React, { useState, useEffect } from 'react';

// Import all the technology logos
import css3Logo from '../Components/Technologylogo/css3.webp';
import firebaseLogo from '../Components/Technologylogo/firebase.webp';
import githubLogo from '../Components/Technologylogo/github.webp';
import hostingerLogo from '../Components/Technologylogo/hostinger.png';
import html5Logo from '../Components/Technologylogo/html5.jpg';
import javaLogo from '../Components/Technologylogo/java.png';
import javascriptLogo from '../Components/Technologylogo/javascript.webp';
import mongodbLogo from '../Components/Technologylogo/mongodb.png';
import mysqlLogo from '../Components/Technologylogo/mysql.png';
import nodejsLogo from '../Components/Technologylogo/nodejs.jpg';
import reactLogo from '../Components/Technologylogo/react.jpg';
import tailwindLogo from '../Components/Technologylogo/tailwind.png';
import vscodeLogo from '../Components/Technologylogo/vscode.png';
import railwayslogo from '../Components/Technologylogo/railways.png';
// Add a placeholder for Railways


// Map for logo imports - makes it easier to reference them by name
const logoMap = {
  css3: css3Logo,
  firebase: firebaseLogo,
  github: githubLogo,
  hostinger: hostingerLogo,
  html5: html5Logo,
  java: javaLogo,
  javascript: javascriptLogo,
  mongodb: mongodbLogo,
  mysql: mysqlLogo,
  nodejs: nodejsLogo,
  react: reactLogo,
  tailwind: tailwindLogo,
  vscode: vscodeLogo,
  railways: railwayslogo
};

const TechnologiesSection = () => {
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('technologies');
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

  // Technology categories with their respective logos
  const technologies = [
    {
      category: "Frontend",
      techs: [
        { name: "HTML5", logo: "html5" },
        { name: "CSS3", logo: "css3" },
        { name: "JavaScript",logo: "javascript" },
        { name: "React", logo: "react"},
        { name: "Tailwind",logo: "tailwind"}
      ]
    },
    {
      category: "Backend",
      techs: [
        { name: "Node.js", logo:"nodejs" },
        { name: "Java", logo: "java" },
        { name: "MongoDB", logo: "mongodb" },
        { name: "MySQL", logo: "mysql" }
      ]
    },
    {
      category: "Tools & Platforms",
      techs: [
        { name: "Git", logo: "github" },
        { name: "Firebase", logo: "firebase" },
        { name: "VS Code", logo: "vscode" },
        { name: "Hostinger", logo: "hostinger"},
        { name: "Railways", logo: "railways"}
      ]
    }
  ];

  // Use actual logos - fixed version
  const getTechLogo = (logoKey) => {
    // Safely convert to string and lowercase
    const key = String(logoKey || '').toLowerCase();
    
    // Check if the key exists in the logoMap and the import was successful
    if (key && logoMap[key]) {
      return (
        <div className="w-12 h-12 flex items-center justify-center rounded-lg overflow-hidden bg-white p-1">
          <img 
            src={logoMap[key]} 
            alt={`${key} logo`} 
            className="w-full h-full object-contain" 
          />
        </div>
      );
    }
    
    // Fallback to placeholder if no logo is found
    return (
      <div className="w-12 h-12 flex items-center justify-center bg-[#0F2336] rounded-lg text-white">
        <span className="font-bold text-xl text-[#178582]">
          {String(logoKey || '').substring(0, 2).toUpperCase()}
        </span>
      </div>
    );
  };

  return (
    <section id="technologies" className="py-24 bg-[#0A1828]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 left-1/4 w-64 h-64 rounded-full bg-[#178582]/5 blur-3xl"></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full bg-[#BFA181]/5 blur-3xl"></div>
          <svg className="absolute bottom-0 right-0 w-64 h-64 text-[#178582]/5 transform rotate-180" fill="currentColor" viewBox="0 0 200 200">
            <path d="M36.8,-48.1C47.6,-36.2,56.3,-24.1,61.4,-9.7C66.5,4.8,68,21.5,61.1,34.9C54.3,48.3,38.9,58.3,22.7,64.1C6.4,69.9,-10.8,71.4,-25.8,66.1C-40.8,60.9,-53.7,48.8,-60.1,34.1C-66.6,19.4,-66.7,2,-63,-14.2C-59.3,-30.4,-51.8,-45.5,-40.2,-57.2C-28.5,-68.9,-14.3,-77.3,-0.6,-76.5C13,-75.7,26,-60,36.8,-48.1Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        {/* Section header with animated reveal */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-3">
            <span className="inline-block py-1 px-3 bg-[#178582]/10 rounded-full text-[#178582] text-sm font-medium">
              Our Stack
            </span>
          </div>
          <h2 className="text-5xl font-bold text-white mb-6">
            Technologies We <span className="text-[#BFA181] relative">
              Work With
              <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 168 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 5.5C68.5 2 114.5 2.5 166 5.5" stroke="#178582" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg">
            We leverage modern technologies to build robust, scalable, and high-performance digital solutions.
          </p>
        </div>
        
        {/* Technologies showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {technologies.map((category, catIndex) => (
            <div 
              key={catIndex} 
              className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${catIndex * 200}ms` }}
            >
              <div className="bg-[#0F2336]/80 backdrop-blur-sm rounded-2xl p-8 border border-[#178582]/20 h-full shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="w-3 h-10 bg-[#178582] rounded-md mr-3"></span>
                  {category.category}
                </h3>
                
                <div className="grid grid-cols-3 gap-4">
                  {category.techs.map((tech, techIndex) => (
                    <div 
                      key={techIndex}
                      className="flex flex-col items-center transition-all duration-500 hover:scale-110"
                      style={{ transitionDelay: `${(catIndex * 5 + techIndex) * 100}ms` }}
                    >
                      {getTechLogo(tech.logo)}
                      <span className="mt-2 text-sm text-gray-300">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Logo Carousel */}
        <div className="mt-20 overflow-hidden">
          <div className="py-10 relative">
            {/* Fade edges */}
            <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-[#0A1828] to-transparent z-10"></div>
            <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-[#0A1828] to-transparent z-10"></div>
            
            {/* First row of logos - moving right */}
            <div className="flex space-x-16 mb-8 tech-marquee">
              {[...Array(10)].map((_, i) => {
                const tech = technologies[0].techs[i % technologies[0].techs.length];
                return (
                  <div key={`row1-${i}`} className="flex-shrink-0 flex flex-col items-center">
                    {getTechLogo(tech.logo)}
                  </div>
                );
              })}
            </div>
            
            {/* Second row of logos - moving left */}
            <div className="flex space-x-16 tech-marquee-reverse">
              {[...Array(10)].map((_, i) => {
                const tech = technologies[1].techs[i % technologies[1].techs.length];
                return (
                  <div key={`row2-${i}`} className="flex-shrink-0 flex flex-col items-center">
                    {getTechLogo(tech.logo)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for marquee animations */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes marqueeReverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        
        .tech-marquee {
          min-width: 150%;
          animation: marquee 25s linear infinite;
        }
        
        .tech-marquee-reverse {
          min-width: 150%;
          animation: marqueeReverse 25s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default TechnologiesSection;