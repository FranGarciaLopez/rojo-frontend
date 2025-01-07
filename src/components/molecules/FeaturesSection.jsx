import React from 'react';
import FeatureCard from '../atoms/FeatureCard';

const FeaturesSection = () => {
  const features = [
    {
      title: 'Find Events Near You',
      description: 'Discover events and activities based on your interests.',
      svgIcon: <i className="fa-solid fa-magnifying-glass"></i>, // Use as SVG
    },
    {
      title: 'Join Activity Groups',
      description: 'Connect with others who share your hobbies and interests.',
      svgIcon: <i className="fa-solid fa-user"></i>, // Use as SVG
    },
    {
      title: 'Real-Time Chat',
      description: 'Stay connected with your groups through instant messaging.',
      svgIcon: <i className="fa-solid fa-comments"></i>, // Use as SVG
    },
  ];

  return (
    <section className="py-5">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-900">
          What You Can Find Here
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              svgIcon={feature.svgIcon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
