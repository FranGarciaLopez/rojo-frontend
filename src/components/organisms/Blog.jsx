import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import NavBar from "../molecules/NavBar";
import GridSection from "../atoms/GridSection";
import Buttons from "../atoms/Buttons";
import { Dashboard } from "./Dashboard";


export const Blog = () => {
  const [blogs, setBlogs] = useState([]); // State to hold the blog data

  const [showModal, setShowModal] = useState(false);

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
    setShowModal(true);  // Mostrar el modal de suscripción
  };

  

  return (
    <>
      <NavBar></NavBar>



      <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-r from-green-300 to-indigo-600 text-white">
  {/* Title Section */}
  <h1 className="text-5xl sm:text-6xl font-Roboto Sans text-center text-gray-800  opacity-80">
  Welcome to Our Blog
</h1>
  <p className="mt-4 text-lg sm:text-xl text-center font-light opacity-80">
    Stay updated with the latest posts, tips, and insights from our blog.
  </p>


  <button
   onClick={handleSubscribeClick}
    
      className="flex items-center py-3 px-6 bg-white-500 text-white text-xl font-semibold rounded-full hover:bg-green-300 transition duration-300 ease-in-out"
    >
      <span className="mr-2">Subscribe</span>
      {/* Hand icon */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M2 12l5 5L22 6" />
      </svg>
      
    </button>
   

 
   
</div>
      <GridSection>
        {blogs.map((blog) => (
           
          <div
            key={blog._id}
         
            className="bg-white p-6 rounded-lg shadow-xl hover:shadow-3xl transition duration-200 ease-in-out"
          >
            {           console.log(blog.user.avatar)}
    
            <h2>{blog.title}</h2>
            <img src={blog.photo} alt={blog.title} width="100%" height="200" />

            <div className="flex flex-col justify-end mt-5">
            <DescriptionToggle description={blog.description} />
  
            

              {/* Render user information */}
              <div className="flex items-center mt-4">
           
                <img
               
                  src={ "https://res.cloudinary.com/dgxcywc2y/image/upload/v1732393699/avatars/oeucc6xqcq3rmyqi7xv6.jpg"} // Display the user's avatar
                  alt={"avatar"}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <p>{blog.user.firstname}</p> {/* Display the user's name */}
              </div>
            </div>
          </div>
        ))}
      </GridSection>
    </>
  );
};


const DescriptionToggle = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle between showing full or truncated description
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      {/* Show either the full description or the truncated one based on state */}
      <p>{isExpanded ? description : `${description.slice(0, 100)}...`}</p>

      {/* Show the "Learn More" button only if the description is truncated */}
      {description.length > 100 && (
        <button
          onClick={toggleDescription}
          className="text-blue-500 mt-2"
        >
          {isExpanded ? 'Show Less' : 'Learn More'}
        </button>
      )}
    </div>
  );
};