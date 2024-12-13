import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import NavBar from "../molecules/NavBar";
import GridSection from "../atoms/GridSection";
import Buttons from "../atoms/Buttons";

export const Dashboard = () => {
    const { authToken, user } = useContext(AuthContext);
    const [activities, setActivities] = useState([]);
    const [preferredCity, setPreferredCity] = useState("");
    const [filterText, setFilterText] = useState("");
    const [visibleItems, setVisibleItems] = useState(6);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(false);
    const [selectedCity, setSelectedCity] = useState(false);
    const [selectedDay, setSelectedDay] = useState(false);
    const [groupDetails, setGroupDetails] = useState([]);
    const [interestedEvents, setInterestedEvents] = useState([]); // To track interested events
    const [loadingEvent, setLoadingEvent] = useState(null); // To track loading states
    const navigate = useNavigate();

    useEffect(() => {
        setPreferredCity(user.preferedCity.name);

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
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchGroups = async () => {
            try {
                const groupDetailsPromises = user.groups.map((groupId) =>
                    fetch(`http://localhost:3000/groups/findgroupbyid/${groupId}`, {
                        headers: { Authorization: `Bearer ${authToken}` },
                    }).then((res) => res.json())
                );
                const data = await Promise.all(groupDetailsPromises);
                setGroupDetails(data);
            } catch (err) {
                setError("Failed to fetch group details.");
            }
        };

        fetchGroups();
        fetchActivities();
    }, [authToken, user]);

    const filteredActivities = activities.filter((activity) => {
        const lowerCaseFilter = filterText.toLowerCase();
        const matchesFilterText =
            (activity.title?.toLowerCase() || "").includes(lowerCaseFilter) ||
            (activity.description?.toLowerCase() || "").includes(lowerCaseFilter) ||
            (activity.category?.name?.toLowerCase() || "").includes(lowerCaseFilter) ||
            (activity.city?.name?.toLowerCase() || "").includes(lowerCaseFilter) ||
            (activity.location?.name?.toLowerCase() || "").includes(lowerCaseFilter) ||
            (activity.dateTime?.toLowerCase() || "").includes(lowerCaseFilter);

        const isCategorySelected =
            !selectedCategory || (activity.category?.name?.toLowerCase() || "").includes(lowerCaseFilter);
        const isCitySelected = !selectedCity || activity.city?.name === preferredCity;
        const isDaySelected = !selectedDay || new Date(activity.dateTime).getDay() === new Date().getDay();

        return matchesFilterText && isCategorySelected && isCitySelected && isDaySelected;
    });

    const showMoreItems = () => {
        setVisibleItems((prev) => prev + 3);
    };

    const openEventGroupPage = (eventId, groupId) => {
        navigate(`/events/${eventId}/groups/${groupId}`);
    };

    const interestedInAEvent = async (eventId) => {
        try {
            setLoadingEvent(eventId); // Set the loading state
            const response = await fetch(`http://localhost:3000/events/signup`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ eventId }),
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message || "You are interested in this event.");
                setInterestedEvents((prev) => [...prev, eventId]);
            } else {
                const errorData = await response.json();
                alert(errorData.message || "Failed to show interest in this event.");
            }
        } catch (err) {
            alert("Network error: Unable to process your request.");
        } finally {
            setLoadingEvent(null); // Reset the loading state
        }
    };

    return (
        <>
            <NavBar />
            <div className="py-20 px-6 flex flex-col items-center justify-center max-w-7xl mx-auto">
                <section className="flex flex-row items-center justify-between w-full px-6 py-4 bg-gray-50">
                    <h1>Explore Activities</h1>
                    <small>
                        {groupDetails.map((group) => (
                            <div key={group._id}>
                                {group.interestedEvents?.length > 0 ? (
                                    <button
                                        onClick={() => openEventGroupPage(group.interestedEvents[0], group._id)}
                                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Join Group Chat
                                    </button>
                                ) : (
                                    <p className="text-gray-500 mt-2">This group has no associated event.</p>
                                )}
                            </div>
                        ))}
                    </small>
                </section>

                <input
                    type="text"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    placeholder="Filter activities by title or description..."
                    className="mb-8"
                />

                <div className="flex gap-6 mb-8">
                    <label className="flex items-center cursor-pointer gap-2">
                        Filter by {user.categoryName.categoryName}
                        <input
                            type="checkbox"
                            checked={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.checked)}
                            className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 checked:bg-blue-600 checked:border-blue-600"
                        />
                    </label>
                    <label className="flex items-center cursor-pointer gap-2">
                        Filter by {user.dayOfTheWeek}
                        <input
                            type="checkbox"
                            checked={selectedDay}
                            onChange={(e) => setSelectedDay(e.target.checked)}
                            className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 checked:bg-blue-600 checked:border-blue-600"
                        />
                    </label>
                    <label className="flex items-center cursor-pointer gap-2">
                        Filter by {user.preferedCity.name}
                        <input
                            type="checkbox"
                            checked={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.checked)}
                            className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 checked:bg-blue-600 checked:border-blue-600"
                        />
                    </label>
                </div>

                {error ? (
                    <p className="text-red-600 font-semibold text-center">{error}</p>
                ) : (
                    <>
                        <GridSection>
                            {filteredActivities.slice(0, visibleItems).map((activity) => (
                                <div
                                    key={activity._id}
                                    className="bg-white p-6 rounded-lg shadow-xl hover:shadow-3xl transition duration-200 ease-in-out flex flex-col"
                                >
                                    <h2>{activity.title}</h2>
                                    <img
                                        src={`${activity.photos[0]
                                            .split("/upload/")[0]}/upload/w_300,h_200,c_fill/${activity.photos[0].split("/upload/")[1]}`}
                                        alt={activity.title}
                                        width="100%"
                                        height="200"
                                    />
                                    <p className="line-clamp-2">{activity.description}</p>
                                    <p>{new Date(activity.dateTime).toLocaleString()}</p>
                                    <p>{activity.location?.name}</p>
                                    <p>{activity.category?.name}</p>
                                    {activity.city && <p>City: {activity.city.name}</p>}

                                    <button
                                        onClick={() => interestedInAEvent(activity._id)}
                                        className={`mt-2 px-4 py-2 ${
                                            loadingEvent === activity._id
                                                ? "bg-gray-400"
                                                : interestedEvents.includes(activity._id)
                                                ? "bg-gray-400"
                                                : "bg-blue-600"
                                        } text-white rounded hover:bg-blue-700`}
                                        disabled={loadingEvent === activity._id || interestedEvents.includes(activity._id)}
                                    >
                                        {loadingEvent === activity._id
                                            ? "Processing..."
                                            : interestedEvents.includes(activity._id)
                                            ? "Already Interested"
                                            : "Interested in this event"}
                                    </button>
                                </div>
                            ))}
                        </GridSection>

                        {visibleItems < filteredActivities.length && (
                            <Buttons onClick={showMoreItems} value="Show More" className="bg-blue-600 hover:bg-blue-700" />
                        )}
                    </>
                )}
            </div>
        </>
    );
};
