import React from 'react';
import HeroSection from '../Components/HeroSection'; // adjust the path if needed
import Navigation from '../Components/Navigation';
import ServicesSection from '../Components/Services';
import TechnologiesSection from '../Components/TechnologiesSection'

function App() {
  return (
    <div>
        <Navigation />
      <HeroSection/>
      <ServicesSection/>
      <TechnologiesSection/>
    </div>
  );
}

export default App;
