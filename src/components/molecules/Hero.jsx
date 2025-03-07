import React from "react";
import { Link } from "react-router-dom";
import FeaturesSection from "../molecules/FeaturesSection";

const Hero = () => {
          return (
                    <section className="relative w-full">
                              <div
                                        className="container mx-auto px-6 lg:px-12 py-16 text-center max-w-4xl"
                                        data-testid="hero"
                              >
                                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                                                  Join Today to connect with the{" "}
                                                  <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight
                                                   text-blue-600 hover:text-blue-400">world</span>
                                        </h1>

                                        <p className="text-lg md:text-xl mt-4 max-w-2xl mx-auto">
                                                  Experience the best in social networking with cutting-edge features
                                                  and a global community at your fingertips.
                                        </p>

                                        <FeaturesSection />

                                        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                                  <Link
                                                            to="/register"
                                                            className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-blue-600 w-full
                                                            rounded-lg shadow-md transition-all duration-200 ease-in-out hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                                                  >
                                                            Get Started
                                                            <svg
                                                                      className="ml-2 w-5 h-5"
                                                                      fill="currentColor"
                                                                      viewBox="0 0 20 20"
                                                                      xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                      <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"></path>
                                                            </svg>
                                                  </Link>

                                                  <Link
                                                            to="/login"
                                                            className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-gray-600 w-full
                                                            rounded-lg shadow-md transition-all duration-200 ease-in-out hover:bg-black focus:ring-4 focus:ring-gray-500"
                                                  >
                                                            Login
                                                  </Link>
                                        </div>
                              </div>
                    </section>
          );
};

export default Hero;
