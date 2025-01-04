import React, { useState, useEffect } from "react";
import NavBar from "../molecules/NavBar";
import GridSection from "../atoms/GridSection";
import BlogHeroSection from "../molecules/BlogHeroSection";
import BlogCard from "../molecules/BlogCard";

export const Blog = () => {
  const [blogs, setBlogs] = useState([]); // State to hold the blog data
  const [showSubscribe, setShowSubscribe] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${baseURL}/blogs/blogs`);
        const data = await response.json();
        setBlogs(data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleSubscribeClick = () => {
    setShowSubscribe((prev) => !prev);
  };

  return (
    <>
      <NavBar />
      <BlogHeroSection
        onSubscribeClick={handleSubscribeClick}
        showSubscribe={showSubscribe}
      />
      <div className="px-6 mt-8 max-w-7xl mx-auto">
        <GridSection>
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </GridSection>
      </div>
    </>
  );
};

export default Blog;
