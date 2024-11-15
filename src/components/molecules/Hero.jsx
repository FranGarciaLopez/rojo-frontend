import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
          return (
                    <section>
                              <div className="px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">

                                        <h1>
                                                  Join Today to connect with the <span className="text-blue-800/50 text-4xl md:text-5xl lg:text-6xl">world</span>
                                        </h1>

                                        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                                                  <Link to="/register" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg
                                                   bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 transition ease-in-out duration-200">
                                                            Get started
                                                            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"></path></svg>
                                                  </Link>

                                                  <Link to="/login" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg 
                                                  bg-gray-800 hover:bg-black focus:ring-4 focus:ring-blue-300 transition duration-200 ease-in-out">
                                                            Login
                                                  </Link>
                                        </div>
                              </div>
                    </section>
          );
};

export default Hero;