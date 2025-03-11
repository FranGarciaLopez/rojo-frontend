import React, { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { getBlogById } from "../../api/apiService"
import { Button } from "@/components/ui/button" // Import shadcn button
import { Card, CardContent } from "@/components/ui/card"

export const BlogPageDetails = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const { authToken } = useContext(AuthContext)

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const fetchedBlog = await getBlogById(authToken, id)
        setBlog(fetchedBlog)
      } catch (err) {
        setError("Failed to fetch blog details")
        console.error(err)
      }
    }

    fetchBlogDetails()
  }, [id, authToken])

  if (error) {
    return <p className="text-center text-red-500">{error}</p>
  }

  if (!blog) {
    return <p className="text-center">Loading blog details...</p>
  }

  return (
    <div className="relative min-h-screen text-white">
      {/* Full-Screen Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${blog.photo})`,
          filter: "brightness(0.4)", // Darkens the background
        }}
      ></div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 flex flex-col space-y-8">
        {/* Back Button */}
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          size="icon"
          className="absolute top-4 left-4 bg-black/60 mx-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Button>

        {/* Blog Card */}
        <Card className="bg-black/60 text-white rounded-lg overflow-hidden shadow-lg">
          <CardContent className="p-6">
            {/* Blog Title and Metadata */}
            <div>
              <h1 className="text-5xl font-extrabold">{blog.title}</h1>
              <div className="mt-2 text-lg">
                <p className="text-white/60">
                  Posted by {blog.user?.firstname || "Unknown"}
                </p>
                <p className="text-white/60">Category: Events</p>
              </div>
            </div>

            {/* Blog Description */}
            <div className="leading-relaxed text-lg mt-6">
              {blog.description.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-white/80">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Blog Image */}
            <div className="flex justify-center mt-8">
              <img
                src={blog.photo}
                alt="Blog"
                className="w-full h-96 object-cover rounded-lg"
                draggable={false}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
