import React, { useEffect } from 'react';
import HeroSection from '../../components/home/HeroSection';
import Building from '../../components/home/Building';
import Faculties from '../../components/home/Faculties';

const Home = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="py-16">
      <HeroSection/>
      <Building/>
      <Faculties/>
    </div>
  );
};

export default Home;
