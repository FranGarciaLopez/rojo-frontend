import React from "react";
import Buttons from "../atoms/Buttons";

const Pagination = ({ currentPage, totalPages, pageNumbers, handlePageClick }) => {
          return (
                    <div className="flex justify-center mt-4">
                              <div className="flex items-center gap-2">
                                        {/* Previous Button */}
                                        <Buttons
                                                  type="button"
                                                  value="Previous"
                                                  className="bg-blue-600 hover:bg-blue-800 px-4 py-2"
                                                  onClick={() => handlePageClick(currentPage - 1)}
                                                  disabled={currentPage === 1}
                                        />

                                        {/* Page Numbers (only visible on large screens) */}
                                        <div className="hidden lg:flex gap-2">
                                                  {pageNumbers.map((number) => (
                                                            <Buttons
                                                                      key={number}
                                                                      onClick={() => handlePageClick(number)}
                                                                      value={number}
                                                                      className={`${currentPage === number
                                                                                          ? "bg-blue-600 text-white"
                                                                                          : "bg-gray-200 hover:bg-gray-500"
                                                                                } px-4 py-2`}
                                                            />
                                                  ))}
                                        </div>

                                        {/* Next Button */}
                                        <Buttons
                                                  type="button"
                                                  value="Next"
                                                  className="bg-blue-600 hover:bg-blue-800 px-4 py-2"
                                                  onClick={() => handlePageClick(currentPage + 1)}
                                                  disabled={currentPage === totalPages}
                                        />
                              </div>
                    </div>
          );
};

export default Pagination;
