import React, { useState } from "react";

const BlogCard = ({ blog }) => {
          const [isExpanded, setIsExpanded] = useState(false);

          const toggleDescription = () => setIsExpanded(!isExpanded);

          return (
                    <div className="relative group overflow-hidden rounded-lg shadow-lg ease-in-out cursor-pointer h-96 w-full mb-8">
                              {/* Full-Size Background Image */}
                              <div
                                        className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                                        style={{
                                                  backgroundImage: `url(${blog.photo})`,
                                        }}
                              ></div>

                              {/* Overlay Gradient */}
                              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-800/60 to-transparent"></div>

                              {/* Content Overlay */}
                              <div className="relative z-10 flex flex-col justify-end h-full p-4">
                                                  <h2 className="text-xl font-semibold text-white">{blog.title}</h2>
                                        <div>
                                                  <p className="text-sm text-white line-clamp-2">
                                                            {isExpanded ? blog.description : `${blog.description.slice(0, 100)}...`}
                                                  </p>
                                                  {blog.description.length > 100 && (
                                                            <button
                                                                      onClick={toggleDescription}
                                                                      className="bg-white text-blue-400 hover:text-black mt-2 transition-colors duration-200"
                                                            >
                                                                      {isExpanded ? "Show Less" : "Learn More"}
                                                            </button>
                                                  )}
                                        </div>
                                        <div className="text-xs space-y-1 mt-4">
                                                  <p className="text-white">Posted by Author</p>
                                        </div>
                              </div>
                    </div>
          );
};

export default BlogCard;
