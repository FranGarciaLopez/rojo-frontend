
const FilterSection = ({ filterText, setFilterText, selectedFilters, setSelectedFilters, user }) => (
          <div className="flex flex-col mb-8 w-full">
                    <input
                              type="text"
                              value={filterText}
                              onChange={(e) => setFilterText(e.target.value)}
                              placeholder="Filter activities..."
                              className="mb-4"
                    />
                    <div className="flex gap-6">
                              {["category", "day", "city"].map((filterType) => (
                                        /* show category, day , city */

                                        <label key={filterType} className="flex items-center cursor-pointer gap-2">
                                                  Filter by {user[filterType]?.name || user[filterType]}
                                                  <input
                                                            type="checkbox"
                                                            checked={selectedFilters[filterType]}
                                                            onChange={(e) => setSelectedFilters((prev) => ({ ...prev, [filterType]: e.target.checked }))}
                                                            className="h-5 w-5"
                                                  />
                                        </label>
                              ))}
                    </div>
          </div>
);

export default FilterSection;