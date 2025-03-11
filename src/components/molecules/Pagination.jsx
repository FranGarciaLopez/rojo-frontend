import React from "react"
import Buttons from "../atoms/Buttons"

const Pagination = ({ currentPage, totalPages, pageNumbers = [], handlePageClick }) => {
    return (
        <div className="flex justify-center mt-4">
            <div className="flex items-center gap-2">
                {/* Previous Button */}
                <Buttons
                    type="button"
                    value="Previous"
                    className="bg-secondary hover:bg-primary hover:text-white px-4 py-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
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
                                ? "bg-accent-foreground text-white"
                                : "bg-gray-200 hover:bg-primary"
                                } px-4 py-2`}
                        />
                    ))}
                </div>

                {/* Next Button */}
                <Buttons
                    type="button"
                    value="Next"
                    className="bg-secondary hover:bg-primary px-4 py-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    onClick={() => handlePageClick(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
            </div>
        </div>
    )
}

export default Pagination
