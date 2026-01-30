import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Components/Navigation'; // Import your Navigation component
import Home from './pages/Home';
import PortfolioPage from './pages/portfolio';
import AnimatedFooter from './Components/Footer';
import AboutUsPage from './pages/aboutus';
import ContactPage from './pages/contact';
import ServicesSection from './Components/Services';

function App() {
  return (
    <Router>
      <Navigation /> {/* Add Navigation here, outside Routes but inside Router */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Add more routes here later, like <Route path="/about" element={<About />} /> */}
      </Routes>
      <AnimatedFooter/>
    </Router>
  );
}

export default App;