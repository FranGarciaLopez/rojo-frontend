import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import NavBar from "../molecules/NavBar";
import GroupSection from "../molecules/GroupSection";
import FilterSection from "../molecules/FilterSection";
import ActivitiesSection from "../molecules/ActivitiesSection";

export const Dashboard = () => {
       const { authToken, user } = useContext(AuthContext);
       const [activities, setActivities] = useState([]);
       const [preferredCity, setPreferredCity] = useState("");
       const [filterText, setFilterText] = useState("");
       const [visibleItems, setVisibleItems] = useState(6);
       const [error, setError] = useState(null);
       const [selectedFilters, setSelectedFilters] = useState({
              category: false,
              city: false,
              day: false,
       });
       const [groupDetails, setGroupDetails] = useState([]);
       const [loadingEvent, setLoadingEvent] = useState(null);
       const navigate = useNavigate();

       useEffect(() => {
              setPreferredCity(user.preferedCity.name);

              const fetchActivities = async () => {
                     try {
                            const response = await fetch("https://rojo-backend.onrender.com://dashboard.render.com/events/events", {
                                   headers: { Authorization: `Bearer ${authToken}` },
                            });
                            if (!response.ok) throw new Error("Failed to fetch activities.");
                            const data = await response.json();
                            setActivities(data);
                     } catch (err) {
                            setError(err.message);
                     }
              };

              const fetchGroups = async () => {
                     try {
                            const groupDetailsPromises = user.groups.map((groupId) =>
                                   fetch(`https://rojo-backend.onrender.com://dashboard.render.com/groups/findgroupbyid/${groupId}`, {
                                          headers: { Authorization: `Bearer ${authToken}` },
                                   }).then((res) => res.json())
                            );
                            const data = await Promise.all(groupDetailsPromises);
                            setGroupDetails(data);
                     } catch (err) {
                            setError("Failed to fetch group details.");
                     }
              };

              fetchActivities();
              fetchGroups();
       }, [authToken, user]);

       const filteredActivities = activities.filter((activity) => {
              const lowerCaseFilter = filterText.toLowerCase();
              const matchesFilterText =
                     (activity.title?.toLowerCase() || "").includes(lowerCaseFilter) ||
                     (activity.description?.toLowerCase() || "").includes(lowerCaseFilter);

              const isCategorySelected =
                     !selectedFilters.category || activity.category?.name === user.categoryName.categoryName;
              const isCitySelected = !selectedFilters.city || activity.city?.name === preferredCity;
              const isDaySelected = !selectedFilters.day || new Date(activity.dateTime).getDay() === new Date().getDay();

              return matchesFilterText && isCategorySelected && isCitySelected && isDaySelected;
       });

       const showMoreItems = () => setVisibleItems((prev) => prev + 3);

       const openEventGroupPage = (eventId, groupId) => {
              navigate(`/events/${eventId}/groups/${groupId}`);
       };

       const interestedInAEvent = async (eventId) => {
              try {
                  setLoadingEvent(eventId);
                  const response = await fetch(`https://rojo-backend.onrender.com://dashboard.render.com/events/signup`, {
                      method: "POST",
                      headers: {
                          Authorization: `Bearer ${authToken}`,
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ eventId }),
                  });
                  if (response.ok) {
                      const data = await response.json();
          
                      // Update user's interestedEvents locally
                      setUser((prevUser) => ({
                          ...prevUser,
                          interestedEvents: [...prevUser.interestedEvents, eventId],
                      }));
          
                      alert(data.message || "You are now interested in this event.");
                  } else {
                      const errorData = await response.json();
                      alert(errorData.message || "Failed to show interest in this event.");
                  }
              } catch (err) {
                  alert("Network error: Unable to process your request.");
              } finally {
                  setLoadingEvent(null);
              }
          };

       return (
              <>
                     <NavBar />
                     <div className="py-20 px-6 flex flex-col items-center justify-center max-w-7xl mx-auto">
                            <GroupSection groupDetails={groupDetails} openEventGroupPage={openEventGroupPage} />
                            <FilterSection
                                   filterText={filterText}
                                   setFilterText={setFilterText}
                                   selectedFilters={selectedFilters}
                                   setSelectedFilters={setSelectedFilters}
                                   user={user}
                            />
                            <ActivitiesSection
                                   activities={filteredActivities}
                                   visibleItems={visibleItems}
                                   showMoreItems={showMoreItems}
                                   interestedInAEvent={interestedInAEvent}
                                   interestedEvents={user.interestedEvents}
                                   loadingEvent={loadingEvent}
                                   error={error}
                            />
                     </div>
              </>
       );
};
