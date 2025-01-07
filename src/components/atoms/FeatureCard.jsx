import React from 'react';

const FeatureCard = ({ title, description, svgIcon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-sm mx-auto hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <div className="flex items-center justify-center mb-4">
        <div className="p-4 bg-blue-100 rounded-full text-blue-500">
          {svgIcon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 text-center">{title}</h3>
      <p className="mt-2 text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default FeatureCard;
