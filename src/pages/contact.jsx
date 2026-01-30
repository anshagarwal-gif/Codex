import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

const ContactPage = () => {
  const [isInView, setIsInView] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');
  const contactRef = useRef(null);
  const formRef = useRef(null);
  
  // Detect when section is in view
  useEffect(() => {
    const handleScroll = () => {
      if (contactRef.current) {
        const position = contactRef.current.getBoundingClientRect();
        if (position.top < window.innerHeight && position.bottom >= 0) {
          setIsInView(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission with EmailJS
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setEmailError('');
    
    // EmailJS service configuration
    // Replace these with your actual EmailJS service ID, template ID, and public key
    const serviceId = 'service_6tmk0po';
    const templateId = 'template_cglo0bj';
    const publicKey = '1RocG_u7W4YsYm46D';

    // Prepare template parameters (match these with your EmailJS template variables)
    const templateParams = {
      fullName: formState.fullName,
      email: formState.email,
      company: formState.company || 'Not provided',
      phone: formState.phone || 'Not provided',
      subject: formState.subject || 'Website Contact Form',
      message: formState.message,
  
    };
    
    // Send the email using EmailJS
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent successfully:', response);
        setIsSubmitting(false);
        setFormSubmitted(true);
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setFormSubmitted(false);
          setFormState({
            fullName: '',
            email: '',
            company: '',
            phone: '',
            subject: '',
            message: ''
          });
        }, 5000);
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
        setIsSubmitting(false);
        setEmailError('Failed to send email. Please try again or contact us directly.');
      });
  };
  
  // Check if form is valid
  const isFormValid = () => {
    return formState.fullName && formState.email && formState.message;
  };

  return (
    <section id="contact" ref={contactRef} className="py-24 bg-gradient-to-b from-[#0A1828] to-[#0F2336] overflow-hidden relative">
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
          {[...Array(15)].map((_, i) => (
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
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-block mb-3">
          </div>
          <div className="relative inline-block">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 mt-[60px]">
              Get in Touch <span className="text-[#BFA181]">with Us</span>
            </h2>
            <div className="absolute bottom-2 left-0 w-full h-1 bg-[#178582] animate-expand-underline"></div>
          </div>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg">
            Have a project in mind? We're here to help transform your digital presence.
          </p>
        </div>
        
        {/* Contact content */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Contact info card - Updated to match theme */}
          <div 
            className={`lg:w-1/3 bg-gradient-to-br from-[#0F2336] to-[#0A1828] text-white rounded-2xl p-8 shadow-xl overflow-hidden relative transition-all duration-1000 transform ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'} border border-[#178582]/20`}
          >
            {/* Card background patterns */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full border-4 border-[#178582]/10 animate-spin-slow"></div>
              <div className="absolute -left-10 -top-10 w-32 h-32 rounded-full border-4 border-[#BFA181]/10 animate-spin-slow-reverse"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-[#178582]/5 animate-pulse-slow"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-8 flex items-center text-[#BFA181]">
                <svg className="w-6 h-6 mr-3 text-[#178582]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                </svg>
                Contact Info
              </h3>
              <div className="space-y-8">
                <div className="flex">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#178582]/10 flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-[#178582]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#BFA181] text-sm mb-1">Phone</p>
                    <p className="font-medium text-white">+91 7385410360</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#178582]/10 flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-[#178582]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#BFA181] text-sm mb-1">Email</p>
                    <p className="font-medium text-white">bhosalekrushnaraj@gmail.com <br/> anshagarwal.rishikesh@gmail.com <br />devsagani19@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#178582]/10 flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-[#178582]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#BFA181] text-sm mb-1">Location</p>
                    <p className="font-medium text-white">Loni Kalbhor, Maharashtra, India</p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          
          {/* Contact form */}
          <div 
            className={`lg:w-2/3 transition-all duration-1000 transform ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="bg-[#0F2336]/70 backdrop-blur-md rounded-2xl p-8 border border-[#178582]/20 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Send Us a Message</h3>
              
              {formSubmitted ? (
                <div className="rounded-xl bg-[#178582]/20 p-6 text-center animate-fade-in">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#178582]/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#178582]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Thank You!</h4>
                  <p className="text-gray-300">Your message has been sent successfully. We'll get back to you soon!</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  {emailError && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
                      {emailError}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group relative">
                      <label className="text-gray-300 text-sm mb-1 block">
                        Full Name <span className="text-[#BFA181]">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formState.fullName}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full bg-[#0A1828] border border-[#178582]/20 focus:border-[#178582] text-gray-300 px-4 py-3 rounded-lg focus:outline-none transition-colors form-input"
                        required
                      />
                      <div className="form-group-focus-line"></div>
                    </div>
                    <div className="form-group relative">
                      <label className="text-gray-300 text-sm mb-1 block">
                        Email Address <span className="text-[#BFA181]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="w-full bg-[#0A1828] border border-[#178582]/20 focus:border-[#178582] text-gray-300 px-4 py-3 rounded-lg focus:outline-none transition-colors form-input"
                        required
                      />
                      <div className="form-group-focus-line"></div>
                    </div>
                    <div className="form-group relative">
                      <label className="text-gray-300 text-sm mb-1 block">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        placeholder="Your company"
                        className="w-full bg-[#0A1828] border border-[#178582]/20 focus:border-[#178582] text-gray-300 px-4 py-3 rounded-lg focus:outline-none transition-colors form-input"
                      />
                      <div className="form-group-focus-line"></div>
                    </div>
                    <div className="form-group relative">
                      <label className="text-gray-300 text-sm mb-1 block">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                        className="w-full bg-[#0A1828] border border-[#178582]/20 focus:border-[#178582] text-gray-300 px-4 py-3 rounded-lg focus:outline-none transition-colors form-input"
                      />
                      <div className="form-group-focus-line"></div>
                    </div>
                  </div>
                  
                  <div className="form-group relative">
                    <label className="text-gray-300 text-sm mb-1 block">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      className="w-full bg-[#0A1828] border border-[#178582]/20 focus:border-[#178582] text-gray-300 px-4 py-3 rounded-lg focus:outline-none transition-colors form-input"
                    />
                    <div className="form-group-focus-line"></div>
                  </div>
                  
                  <div className="form-group relative">
                    <label className="text-gray-300 text-sm mb-1 block">
                      Message <span className="text-[#BFA181]">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project, requirements, or questions..."
                      rows={6}
                      className="w-full bg-[#0A1828] border border-[#178582]/20 focus:border-[#178582] text-gray-300 px-4 py-3 rounded-lg focus:outline-none transition-colors form-input resize-none"
                      required
                    ></textarea>
                    <div className="form-group-focus-line"></div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!isFormValid() || isSubmitting}
                      className={`px-8 py-3 rounded-lg transition-all duration-300 font-medium relative overflow-hidden group ${
                        isFormValid() && !isSubmitting
                          ? 'bg-[#178582] text-white hover:shadow-xl hover:shadow-[#178582]/20 transform hover:translate-y-[-4px]'
                          : 'bg-[#178582]/50 text-white/70 cursor-not-allowed'
                      }`}
                    >
                      <span className="relative z-10 flex items-center">
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <svg className="ml-2 w-5 h-5 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </>
                        )}
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-[#178582] to-[#178582]/70 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
        
        {/* Rest of your component remains the same */}
        
        {/* Animation styles */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.05); opacity: 0.1; }
          }
          @keyframes spin-slow {
            to { transform: rotate(360deg); }
          }
          @keyframes spin-slow-reverse {
            to { transform: rotate(-360deg); }
          }
          @keyframes expand-underline {
            0% { transform: scaleX(0); }
            100% { transform: scaleX(1); }
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes ping {
            0% { transform: scale(1); opacity: 1; }
            75%, 100% { transform: scale(2); opacity: 0; }
          }
          
          .animate-float {
            animation: float 15s ease-in-out infinite;
          }
          .animate-pulse-slow {
            animation: pulse-slow 10s ease-in-out infinite;
          }
          .animate-spin-slow {
            animation: spin-slow 30s linear infinite;
          }
          .animate-spin-slow-reverse {
            animation: spin-slow-reverse 25s linear infinite;
          }
          .animate-expand-underline {
            animation: expand-underline 1.5s ease-out forwards;
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
          .animate-ping {
            animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          }

          .form-group-focus-line {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background-color: #178582;
            transition: width 0.3s ease-out;
          }

          .form-input:focus + .form-group-focus-line {
            width: 100%;
          }

          .bg-grid-pattern {
            background-size: 20px 20px;
            background-image: linear-gradient(to right, #178582 1px, transparent 1px),
                            linear-gradient(to bottom, #178582 1px, transparent 1px);
          }
        `}</style>
      </div>
    </section>
  );
};

export default ContactPage;