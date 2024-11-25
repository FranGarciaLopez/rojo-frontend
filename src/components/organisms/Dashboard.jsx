import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import NavBar from "../molecules/NavBar";
import GridSection from "../atoms/GridSection";
import Buttons from "../atoms/Buttons";

export const Dashboard = () => {
          const { authToken } = useContext(AuthContext);
          const [activities, setActivities] = useState([]);
          const [preferredCity, setPreferredCity] = useState('');
          const [error, setError] = useState(null);
          const [filterText, setFilterText] = useState("");
          const [visibleItems, setVisibleItems] = useState(6);
          const [selectedCategory, setSelectedCategory] = useState(false);
          const [selectedCity, setSelectedCity] = useState(false);
          const [selectedDay, setSelectedDay] = useState(false);
          const { user } = useContext(AuthContext);

          useEffect(() => {

                    setPreferredCity(user.preferedCity.name);
                    const fetchActivities = async () => {
                              try {
                                        const activitiesResponse = await fetch("http://localhost:3000/events/events", {
                                                  headers: {
                                                            Authorization: `Bearer ${authToken}`,
                                                  },
                                        });
                                        if (!activitiesResponse.ok) throw new Error("Failed to fetch activities.");
                                        const activitiesData = await activitiesResponse.json();
                                        setActivities(activitiesData);
                              } catch (error) {
                                        setError(error.message);
                              }
                    };

                    fetchActivities();
          }, [authToken]);

          // Handle filtering based on input text and checkbox filters
          const filteredActivities = activities.filter((activity) => {
                    const lowerCaseFilter = filterText.toLowerCase();

                    // Check if activity title or description matches the filter text
                    const matchesFilterText =
                              (activity.title?.toLowerCase() || '').includes(lowerCaseFilter) ||
                              (activity.description?.toLowerCase() || '').includes(lowerCaseFilter) ||
                              (activity.category?.name?.toLowerCase() || '').includes(lowerCaseFilter) ||
                              (activity.city?.name?.toLowerCase() || '').includes(lowerCaseFilter) ||
                              (activity.location?.name?.toLowerCase() || '').includes(lowerCaseFilter) ||
                              (activity.dateTime?.toLowerCase() || '').includes(lowerCaseFilter);

                    // Checkbox filters: Category, City, Day of the Week
                    const isCategorySelected = !selectedCategory || (activity.category?.name?.toLowerCase() || '').includes(lowerCaseFilter);
                    const isCitySelected = !selectedCity || activity.city?.name === preferredCity;
                    const isDaySelected = !selectedDay || new Date(activity.dateTime).getDay() === new Date().getDay();

                    return matchesFilterText && isCategorySelected && isCitySelected && isDaySelected;
          });

          const showMoreItems = () => {
                    setVisibleItems((prev) => prev + 3); // Show 3 more items
          };

          return (
                    <>
                              <NavBar />
                              <div className="py-20 px-6 flex flex-col items-center justify-center max-w-7xl mx-auto">
                                        <h1 className="mb-8">Explore Activities</h1>

                                        <input
                                                  type="text"
                                                  value={filterText}
                                                  onChange={(e) => setFilterText(e.target.value)}
                                                  placeholder="Filter activities by title or description..."
                                                  className="mb-8"
                                        />

                                        <div className="flex gap-6 mb-8">

                                                  <div className="inline-flex items-center">
                                                            <label className="flex items-center cursor-pointer relative gap-2">
                                                                      Filter by {user.categoryName.categoryName}
                                                                      <input
                                                                                type="checkbox"
                                                                                checked={selectedCategory}
                                                                                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-blue-600 checked:border-blue-600"
                                                                                id="checkCategory"
                                                                                onChange={(e) => setSelectedCategory(e.target.checked)}
                                                                      />
                                                            </label>
                                                  </div>

                                                  <div className="flex items-center gap-5">
                                                            <label className="flex items-center cursor-pointer relative gap-2">
                                                                      Filter by {user.dayOfTheWeek}
                                                                      <input
                                                                                type="checkbox"
                                                                                checked={selectedDay}
                                                                                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-blue-600 checked:border-blue-600"
                                                                                id="checkDay"
                                                                                onChange={(e) => setSelectedDay(e.target.checked)}
                                                                      />
                                                            </label>
                                                  </div>

                                                  <div className="inline-flex items-center">
                                                            <label className="flex items-center cursor-pointer relative gap-2">
                                                                      Filter by {user.preferedCity.name}
                                                                      <input
                                                                                type="checkbox"
                                                                                checked={selectedCity}
                                                                                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-blue-600 checked:border-blue-600"
                                                                                id="checkCity"
                                                                                onChange={(e) => setSelectedCity(e.target.checked)}
                                                                      />
                                                                      
                                                            </label>
                                                  </div>

                                        </div>

                                        {error ? (
                                                  <p className="text-red-600 font-semibold text-center">{error}</p>
                                        ) : (
                                                  <>
                                                            <h2 className="my-6">Activities</h2>
                                                            <GridSection>
                                                                      {filteredActivities.slice(0, visibleItems).map((activity) => (
                                                                                <div
                                                                                          key={activity._id}
                                                                                          className="bg-white p-6 rounded-lg shadow-xl hover:shadow-3xl transition duration-200 ease-in-out flex flex-col h-full"
                                                                                >
                                                                                          <h2>{activity.title}</h2>
                                                                                          <img
                                                                                                    src={activity.photos[0]}
                                                                                                    alt={activity.title}
                                                                                                    width="100%"
                                                                                                    height="50%"
                                                                                          />

                                                                                          {/* Content that needs to be pushed to the bottom */}
                                                                                          <div className="flex flex-col mt-5 flex-grow justify-end">
                                                                                                    <p className="line-clamp-3">{activity.description}</p>
                                                                                                    <p>{new Date(activity.dateTime).toLocaleString()}</p>
                                                                                                    <p>{activity.location?.name}</p>
                                                                                                    <p>{activity.category?.name}</p>
                                                                                                    {activity.city && <p>City: {activity.city.name}</p>}
                                                                                          </div>
                                                                                </div>
                                                                      ))}

                                                            </GridSection>

                                                            {visibleItems < filteredActivities.length && (
                                                                      <div className="flex justify-center mt-4">
                                                                                <Buttons
                                                                                          onClick={showMoreItems}
                                                                                          value="Show More"
                                                                                          className="bg-blue-600 hover:bg-blue-700"
                                                                                />
                                                                      </div>
                                                            )}
                                                  </>
                                        )}
                              </div>
                    </>
          );
};
