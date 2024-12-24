import React, { useState, useEffect } from "react";
import NavBar from "../molecules/NavBar";
import GridSection from "../atoms/GridSection";
import { Subscribe } from "../organisms/Subscribe";

export const Blog = () => {
  const [blogs, setBlogs] = useState([]); // State to hold the blog data
  const [showSubscribe, setShowSubscribe] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:3000/blogs/blogs");
        const data = await response.json();
        setBlogs(data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleSubscribeClick = () => {
    setShowSubscribe((prev) =>{return !prev} );
  };


  return (
    <>
      <NavBar />
      <HeroSection onSubscribeClick={handleSubscribeClick} showSubscribe={showSubscribe} />
      <div className="px-6">
        <GridSection>
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </GridSection>
      </div>
    </>
  );
};

const HeroSection = ({ onSubscribeClick, showSubscribe }) => (
  <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-r from-green-300 to-indigo-600 text-white">
    <h1 className="text-5xl sm:text-6xl font-Roboto Sans text-center text-gray-800 opacity-80">
      Welcome to Our Blog
    </h1>
    <p className="mt-8 text-lg sm:text-xl text-center font-bold">
      Stay updated with the latest posts, tips, and insights from our blog.
    </p>
    <button
      onClick={onSubscribeClick}
      className="flex items-center py-3 px-6 bg-white text-gray-800 text-xl font-semibold rounded-full hover:bg-green-300 transition duration-300 ease-in-out"
    >
      <span className="mr-2">Subscribe</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M2 12l5 5L22 6" />
      </svg>
    </button>
    {showSubscribe && <Subscribe />}
  </div>
);

const BlogCard = ({ blog }) => (
  <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-3xl transition duration-200 ease-in-out max-w-7xl">
    <h2 className="text-2xl font-semibold">{blog.title}</h2>
    <img src={blog.photo} alt={blog.title} className="w-full h-48 object-cover mt-4 rounded-lg" />
    <div className="flex flex-col justify-end mt-5">
      <DescriptionToggle description={blog.description} />
      <div className="flex items-center mt-4">
        <img
          src="https://res.cloudinary.com/dgxcywc2y/image/upload/v1732393699/avatars/oeucc6xqcq3rmyqi7xv6.jpg"
          alt="avatar"
          className="w-10 h-10 rounded-full mr-3"
        />
        <span className="text-gray-700">Posted by Author</span>
      </div>
    </div>
  </div>
);

const DescriptionToggle = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => setIsExpanded(!isExpanded);

  return (
    <div>
      <p>{isExpanded ? description : `${description.slice(0, 100)}...`}</p>
      {description.length > 100 && (
        <button onClick={toggleDescription} className="text-blue-500 mt-2">
          {isExpanded ? "Show Less" : "Learn More"}
        </button>
      )}
    </div>
  );
};
