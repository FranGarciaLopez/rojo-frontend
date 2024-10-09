import React from 'react';

import Hero from '../molecules/Hero';
import Footer from '../molecules/Footer';

export const Home = () => {
          return (
                    <div className="flex flex-col min-h-screen">
                              <Hero />
                              <Footer />
                    </div>
          );
};