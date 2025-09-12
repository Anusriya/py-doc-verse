import React from 'react';
import Hero from '@/components/Hero';
import Carousel from '@/components/Carousel';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Carousel />
    </div>
  );
};

export default Home;