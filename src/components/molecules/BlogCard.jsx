import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
// Import shadcn/ui components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const BlogCard = ({ blog }) => {
          const [isExpanded] = useState(false)
          const navigate = useNavigate()

          const handleCardClick = () => {
                    navigate(`/blog/${blog._id}`)
          }

          return (
                    <Card
                              onClick={handleCardClick}
                              className="relative overflow-hidden cursor-pointer h-96 w-full mb-8 group transition-shadow hover:shadow-lg"
                    >
                              {/* Full-Size Background Image */}
                              <div
                                        className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                                        style={{
                                                  backgroundImage: `url(${blog.photo})`,
                                        }}
                              />

                              {/* Overlay Gradient */}
                              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-800/60 to-transparent" />

                              {/* Content Overlay */}
                              <CardContent className="relative z-10 flex flex-col justify-end h-full p-4">
                                        <CardTitle className="text-xl font-semibold text-white">
                                                  {blog.title}
                                        </CardTitle>
                                        <div>
                                                  <p className="text-sm text-white line-clamp-2">
                                                            {isExpanded
                                                                      ? blog.description
                                                                      : `${blog.description.slice(0, 200)}...`}
                                                  </p>
                                        </div>
                                        <div className="text-xs space-y-1 mt-4">
                                                  <p className="text-white">Posted by Author</p>
                                        </div>
                              </CardContent>
                    </Card>
          )
}

export default BlogCard
