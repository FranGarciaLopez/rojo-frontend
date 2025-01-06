
export const EventDetailsSkeleton = () => {
          return (
                    <div className="relative min-h-screen bg-black rounded-lg overflow-hidden">
                              {/* Background Placeholder */}
                              <div
                                        className="absolute inset-0 bg-gray-800 bg-opacity-60 animate-pulse"
                                        style={{
                                                  backgroundImage: `linear-gradient(to bottom, #1f1f1f, #141414)`,
                                        }}
                              ></div>

                              {/* Gradient Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>

                              {/* Content Placeholder */}
                              <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 flex flex-col space-y-8">
                                        {/* Back Button Placeholder */}
                                        <div className="absolute top-4 left-4 p-4 bg-gray-700 rounded-md animate-pulse"></div>

                                        {/* Title and Metadata Placeholder */}
                                        <div>
                                                  <div className="h-12 bg-gray-700 w-3/4 rounded-md animate-pulse"></div>
                                                  <div className="mt-4 space-y-2">
                                                            <div className="h-4 bg-gray-700 w-1/2 rounded-md animate-pulse"></div>
                                                            <div className="h-4 bg-gray-700 w-1/3 rounded-md animate-pulse"></div>
                                                            <div className="h-4 bg-gray-700 w-1/4 rounded-md animate-pulse"></div>
                                                  </div>
                                        </div>

                                        {/* Description Placeholder */}
                                        <div className="space-y-4">
                                                  <div className="h-6 bg-gray-700 rounded-md animate-pulse"></div>
                                                  <div className="h-6 bg-gray-700 rounded-md animate-pulse"></div>
                                                  <div className="h-6 bg-gray-700 rounded-md animate-pulse"></div>
                                        </div>
                              </div>
                    </div>
          );
};