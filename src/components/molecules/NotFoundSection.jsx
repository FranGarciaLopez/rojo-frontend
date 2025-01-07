import React from "react";
import { Link } from "react-router-dom";

const NotFoundSection = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center px-4">
        <h1 className="text-7xl font-bold text-gray-800">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-700">
          Oops! Page Not Found
        </h2>
        <p className="mt-2 text-gray-600">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundSection;
