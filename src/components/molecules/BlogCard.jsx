import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
          const [isExpanded] = useState(false);
          const navigate = useNavigate();

          const handleCardClick = () => {
                    navigate(`/blog/${blog._id}`);
          };

          return (
                    <div
                              className="relative group overflow-hidden rounded-lg shadow-lg ease-in-out cursor-pointer h-96 w-full mb-8"
                              onClick={handleCardClick}
                    >
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
                              <div className="relative z-1 flex flex-col justify-end h-full p-4">
                                        <h2 className="text-xl font-semibold text-white">{blog.title}</h2>
                                        <div>
                                                  <p className="text-sm text-white line-clamp-2">
                                                            {isExpanded ? blog.description : `${blog.description.slice(0, 200)}...`}
                                                  </p>
                                        </div>
                                        <div className="text-xs space-y-1 mt-4">
                                                  <p className="text-white">Posted by Author</p>
                                        </div>
                              </div>
                    </div>
          );
};

export default BlogCard;
