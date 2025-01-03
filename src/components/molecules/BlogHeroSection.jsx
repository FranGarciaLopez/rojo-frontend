import React from "react";
import { Subscribe } from "../organisms/Subscribe";

const BlogHeroSection = ({ onSubscribeClick, showSubscribe }) => (
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

export default BlogHeroSection;
