import React from "react";

const DashboardSkeleton = () => {
    return (
        <div className="py-20 px-4 flex flex-col items-center justify-center mx-auto max-w-7xl animate-pulse">
            {/* Alert Skeleton */}
            <div className="w-full h-12 bg-gray-200 rounded-md mb-6"></div>

            {/* Group Section Skeleton */}
            <div className="w-full h-32 bg-gray-200 rounded-lg mb-8"></div>

            {/* Filter Section Skeleton */}
            <div className="w-full flex gap-6 mb-8">
                <div className="flex-1 h-12 bg-gray-200 rounded-md"></div>
                <div className="flex-1 h-12 bg-gray-200 rounded-md"></div>
                <div className="flex-1 h-12 bg-gray-200 rounded-md"></div>
            </div>

            {/* Activities Section Skeleton */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="h-48 bg-gray-200 rounded-lg shadow-sm"
                    ></div>
                ))}
            </div>

            {/* Show More Button Skeleton */}
            <div className="mt-8 w-32 h-10 bg-gray-200 rounded-md"></div>
        </div>
    );
};

export default DashboardSkeleton;
