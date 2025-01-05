import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { getBlogById } from "../../api/apiService";

export const BlogPageDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const fetchedBlog = await getBlogById(authToken, id);
        setBlog(fetchedBlog);
      } catch (err) {
        setError("Failed to fetch blog details");
        console.error(err);
      }
    };

    fetchBlogDetails();
  }, [id, authToken]);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!blog) {
    return <p className="text-center">Loading blog details...</p>;
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
        {/* Blog Title and Metadata */}

        <button
          className="absolute top-4 left-4 p-4 bg-black/60 text-white rounded-md hover:bg-white hover:text-black transition-colors duration-200"
          onClick={() => navigate(-1)}
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
        </button>
        <div>
          <h1 className="text-5xl font-extrabold text-white">{blog.title}</h1>
          <div className="mt-2 text-lg">
            <p className="text-white/60">Posted by {blog.user?.firstname || "Unknown"}</p>
            <p className="text-white/60">Category: Events</p>
          </div>
        </div>

        {/* Blog Description */}
        <div className="leading-relaxed text-lg">
          {blog.description.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4 text-white/80">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Blog image */}
        <div className="flex justify-center">
          <img src={blog.photo} alt="Blog" className="w-full h-96 object-cover rounded-lg" draggable={false} />

        </div>
      </div>
    </div>
  );
};
