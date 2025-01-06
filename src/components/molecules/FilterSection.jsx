const FilterSection = ({ filterText, setFilterText, selectedFilters, setSelectedFilters, user }) => {
          // Map for filter types and their corresponding user object properties
          const filterLabels = {
                    category: user?.categoryName?.categoryName || "No Category",
                    day: user?.dayOfTheWeek || "No Day",
                    city: user?.preferedCity?.name || "No City",
          };

          return (
                    <div className="flex flex-col mb-8 w-full">
                              {/* Search Input */}
                              <input
                                        type="text"
                                        value={filterText}
                                        onChange={(e) => setFilterText(e.target.value)}
                                        placeholder="Filter activities..."
                                        className="mb-4 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />

                              {/* Filters */}
                              <div className="flex gap-6">
                                        {["category", "day", "city"].map((filterType) => (
                                                  <label key={filterType} className="flex items-center cursor-pointer gap-2">
                                                            {/* Display filter label */}
                                                            <span>Filter by {filterLabels[filterType]}</span>
                                                            <input
                                                                      type="checkbox"
                                                                      checked={selectedFilters[filterType]}
                                                                      onChange={(e) =>
                                                                                setSelectedFilters((prev) => ({
                                                                                          ...prev,
                                                                                          [filterType]: e.target.checked,
                                                                                }))
                                                                      }
                                                                      className="h-5 w-5"
                                                            />
                                                  </label>
                                        ))}
                              </div>
                    </div>
          );
};

export default FilterSection;
