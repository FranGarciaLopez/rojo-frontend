import React from 'react';

import Hero from '../molecules/Hero';
import Footer from '../molecules/Footer';

export const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero className="flex-1" data-testid="hero" />
      <Footer data-testid="footer" />
    </div>
  );
};
