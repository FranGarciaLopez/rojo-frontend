import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

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
                              <Input
                                        type="text"
                                        value={filterText}
                                        onChange={(e) => setFilterText(e.target.value)}
                                        placeholder="Filter activities..."
                                        className="mb-4 w-full"
                              />

                              {/* Filters */}
                              <div className="flex flex-wrap gap-4 sm:gap-6">
                                        {["category", "day", "city"].map((filterType) => (
                                                  <label
                                                            key={filterType}
                                                            className="flex items-center gap-2 w-full sm:w-auto"
                                                  >
                                                            {/* Display filter label */}
                                                            <span className="text-sm text-muted-foreground">
                                                                      Filter by {filterLabels[filterType]}
                                                            </span>
                                                            <Checkbox
                                                                      checked={selectedFilters[filterType]}
                                                                      onCheckedChange={(checked) =>
                                                                                setSelectedFilters((prev) => ({
                                                                                          ...prev,
                                                                                          [filterType]: checked,
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
