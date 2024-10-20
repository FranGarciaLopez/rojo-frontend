import React from 'react';

const CustomAlert = ({ title, description, actions }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">{title}</strong>
      <span className="block sm:inline">{description}</span>
      <div className="mt-4">{actions}</div>
    </div>
  );
};

export default CustomAlert;