import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import NavBar from "../molecules/NavBar";

export const Dashboard = () => {
          const { authToken } = useContext(AuthContext);
          const [activities, setActivities] = useState([]);
          const [error, setError] = useState(null);
          const [filterText, setFilterText] = useState("");

          useEffect(() => {
                    const fetchActivities = async () => {
                              try {
                                        const response = await fetch("http://localhost:3000/events/events", {
                                                  headers: {
                                                            Authorization: `Bearer ${authToken}`,
                                                  },
                                        });
                                        if (!response.ok) throw new Error("Failed to fetch activities.");

                                        const data = await response.json();
                                        setActivities(data);
                              } catch (error) {
                                        setError(error.message);
                              }
                    };
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

          return (
                    <>
                              <NavBar />
                              <div className="p-10 flex flex-col items-center justify-center max-w-6xl mx-auto">
                                        <h1 className="text-3xl font-bold mb-8 text-gray-800">Explore Activities</h1>

                                        <input
                                                  type="text"
                                                  value={filterText}
                                                  onChange={(e) => setFilterText(e.target.value)}
                                                  placeholder="Filter activities..."
                                                  className="mb-8 p-3 border border-gray-300 rounded-lg w-full max-w-lg text-gray-700 focus:outline-none focus:border-blue-500 shadow-md"
                                        />

                                        {error ? (
                                                  <p className="text-red-600 font-semibold text-center">{error}</p>
                                        ) : (
                                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                                                            {filteredActivities.map((activity) => (
                                                                      <div key={activity._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl">
                                                                                <h2 className="font-semibold text-xl text-blue-700 mb-2">{activity.title}</h2>
                                                                                <p className="text-gray-600 mb-1">{activity.description}</p>
                                                                                <p className="text-gray-500 text-sm mb-1">
                                                                                          {new Date(activity.dateTime).toLocaleString()}
                                                                                </p>
                                                                                <p className="text-gray-500 text-sm mb-1">{activity.location?.name}</p>
                                                                                <p className="text-gray-500 text-sm mb-1">{activity.category?.name}</p>
                                                                                {activity.city && (
                                                                                          <p className="text-gray-500 text-sm">City: {activity.city.name}</p>
                                                                                )}
                                                                      </div>
                                                            ))}
                                                  </div>
                                        )}
                              </div>

                    </>
          );
};

