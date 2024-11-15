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
          const [visibleItems, setVisibleItems] = useState(3); // Show 3 items initially

          useEffect(() => {
                    const fetchUserPreferences = async () => {
                              try {
                                        const userResponse = await fetch("http://localhost:3000/user", {
                                                  headers: {
                                                            Authorization: `Bearer ${authToken}`,
                                                  },
                                        });
                                        if (!userResponse.ok) throw new Error("Failed to fetch user preferences.");
                                        const userData = await userResponse.json();
                                        setPreferredCity(userData.user.preferedCity.name);
                              } catch (error) {
                                        setError(error.message);
                              }
                    };

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

                    fetchUserPreferences();
                    fetchActivities();
          }, [authToken]);

          const filteredActivities = activities.filter((activity) => {
                    const lowerCaseFilter = filterText.toLowerCase();
                    return (
                              activity.title.toLowerCase().includes(lowerCaseFilter) ||
                              activity.description.toLowerCase().includes(lowerCaseFilter) ||
                              activity.location?.name.toLowerCase().includes(lowerCaseFilter) ||
                              activity.category?.name.toLowerCase().includes(lowerCaseFilter) ||
                              activity.city?.name.toLowerCase().includes(lowerCaseFilter)
                    );
          });

          const activitiesInPreferredCity = activities.filter(
                    (activity) => activity.city?.name === preferredCity
          );

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
                                                  placeholder="Filter activities..."
                                                  className="mb-8"
                                        />

                                        {error ? (
                                                  <p className="text-red-600 font-semibold text-center">{error}</p>
                                        ) : (
                                                  <>
                                                            {/* Section: Activities in Preferred City */}
                                                            <h2 className="my-8">Activities in {preferredCity}</h2>
                                                            <GridSection>
                                                                      {activitiesInPreferredCity.map((activity) => (
                                                                                <div
                                                                                          key={activity._id}
                                                                                          className="bg-white p-6 rounded-lg shadow-xl hover:shadow-3xl transition duration-200 ease-in-out"
                                                                                >
                                                                                          <h2>{activity.title}</h2>
                                                                                          <img
                                                                                                    src={activity.photos[0]}
                                                                                                    alt={activity.title}
                                                                                                    width="100%"
                                                                                                    height="500"
                                                                                          />
                                                                                          <div className="flex flex-col justify-end mt-5">
                                                                                                    <p>{activity.description}</p>
                                                                                                    <p>
                                                                                                              {new Date(activity.dateTime).toLocaleString()}
                                                                                                    </p>
                                                                                                    <p>{activity.location?.name}</p>
                                                                                                    <p>{activity.category?.name}</p>
                                                                                                    {activity.city && (
                                                                                                              <p>City: {activity.city.name}</p>
                                                                                                    )}
                                                                                          </div>
                                                                                </div>
                                                                      ))}
                                                            </GridSection>

                                                            <h2 className="my-6">Past activities</h2>
                                                            <GridSection>
                                                                      {filteredActivities.slice(0, visibleItems).map((activity) => (
                                                                                <div
                                                                                          key={activity._id}
                                                                                          className="bg-white p-6 rounded-lg shadow-xl hover:shadow-3xl transition duration-200 ease-in-out"
                                                                                >
                                                                                          <h2>{activity.title}</h2>
                                                                                          <img
                                                                                                    src={activity.photos[0]}
                                                                                                    alt={activity.title}
                                                                                                    width="100%"
                                                                                                    height="500"
                                                                                          />
                                                                                          <div className="flex flex-col justify-end mt-5">
                                                                                                    <p>{activity.description}</p>
                                                                                                    <p>
                                                                                                              {new Date(activity.dateTime).toLocaleString()}
                                                                                                    </p>
                                                                                                    <p>{activity.location?.name}</p>
                                                                                                    <p>{activity.category?.name}</p>
                                                                                                    {activity.city && (
                                                                                                              <p>City: {activity.city.name}</p>
                                                                                                    )}
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
