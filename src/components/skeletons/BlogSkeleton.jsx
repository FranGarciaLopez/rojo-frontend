import React from "react";

const BlogSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="h-64 bg-gray-200 rounded-md mb-8"></div>

      {/* Blog Grid Skeleton */}
      <div className="px-6 mt-8 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-64 bg-gray-200 rounded-md shadow-md"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BlogSkeleton;
