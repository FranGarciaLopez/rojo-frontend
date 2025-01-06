import React from "react";

const AdminDashboardSkeleton = () => {
  return (
    <div className="px-4 py-20 max-w-7xl mx-auto animate-pulse">
      {/* Title Skeleton */}
      <div className="h-8 bg-gray-200 rounded-md w-1/3 mb-8"></div>

      {/* Buttons Skeleton */}
      <div className="flex gap-4 mb-8">
        <div className="h-10 w-32 bg-gray-200 rounded-md"></div>
        <div className="h-10 w-32 bg-gray-200 rounded-md"></div>
        <div className="h-10 w-32 bg-gray-200 rounded-md"></div>
      </div>

      {/* Analytics Section Skeleton */}
      <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="p-4 bg-gray-200 rounded-lg shadow-md h-24"
          ></div>
        ))}
      </div>

      {/* Events Section Skeleton */}
      <div className="mb-8">
        <div className="h-6 bg-gray-200 rounded-md w-1/4 mb-4"></div>
        <div className="grid grid-cols-1 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-12 bg-gray-200 rounded-md shadow"
            ></div>
          ))}
        </div>
      </div>

      {/* Users Section Skeleton */}
      <div className="mb-8">
        <div className="h-6 bg-gray-200 rounded-md w-1/4 mb-4"></div>
        <div className="grid grid-cols-1 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-12 bg-gray-200 rounded-md shadow"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardSkeleton;
