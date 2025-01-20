import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import NavBar from "../molecules/NavBar";
import GroupSection from "../molecules/GroupSection";
import FilterSection from "../molecules/FilterSection";
import ActivitiesSection from "../molecules/ActivitiesSection";
import Alert from "../atoms/Alert";
import DashboardSkeleton from "../skeletons/DashboardSkeleton";
import { getGroupsByUserId, getEvents } from "../../api/apiService";

export const Dashboard = () => {
    const { authToken, user, setUser } = useContext(AuthContext);
    const [activities, setActivities] = useState([]);
    const [preferredCity, setPreferredCity] = useState("");
    const [filterText, setFilterText] = useState("");
    const [visibleItems, setVisibleItems] = useState(6);
    const [selectedFilters, setSelectedFilters] = useState({
        category: false,
        city: false,
        day: false,
    });
    const [groupDetails, setGroupDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingEvent, setLoadingEvent] = useState(null);
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();

    const baseURL = import.meta.env.VITE_API_BASE_URL;
    useEffect(() => {
        if (!authToken || !user) {
            navigate("/login");
            return;
        }

        if (user.preferedCity) {
            setPreferredCity(user.preferedCity.name);
        }

        const fetchDashboardData = async () => {
            try {
                setLoading(true);

                const [eventsResponse, userGroupsResponse] = await Promise.all([
                    getEvents(authToken),
                    getGroupsByUserId(authToken, user._id),
                ]);

                setActivities(eventsResponse.data);
                setGroupDetails(userGroupsResponse.data);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
                setAlert({ message: "Failed to load dashboard data.", type: "error" });
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [authToken, user, navigate]);

    const filteredActivities = activities.filter((activity) => {
        const lowerCaseFilter = filterText.toLowerCase();

        const matchesFilterText =
            (activity.title?.toLowerCase() || "").includes(lowerCaseFilter) ||
            (activity.description?.toLowerCase() || "").includes(lowerCaseFilter);

        const isCategorySelected =
            !selectedFilters.category ||
            activity.category?.categoryName === user?.categoryName?.categoryName;

        const isCitySelected =
            !selectedFilters.city || activity.city?.name === preferredCity;

        const isDaySelected =
            !selectedFilters.day || new Date(activity.dateTime).getDay() === new Date().getDay();

        return matchesFilterText && isCategorySelected && isCitySelected && isDaySelected;
    });

    const showMoreItems = () => setVisibleItems((prev) => prev + 3);

    const openEventGroupPage = (eventId, groupId) => {
        navigate(`/events/${eventId}/groups/${groupId}`);
    };

    const interestedInAEvent = async (eventId) => {
        try {
            setLoadingEvent(eventId);
            const response = await fetch(`${baseURL}/events/signup`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ eventId }),
            });

            if (response.ok) {
                setUser((prevUser) => ({
                    ...prevUser,
                    interestedEvents: [...prevUser.interestedEvents, eventId],
                }));
                setAlert({ message: "Successfully signed up for the event.", type: "success" });
            } else {
                throw new Error("Failed to sign up for the event.");
            }
        } catch (err) {
            console.error("Error signing up for event:", err);
            setAlert({ message: "Failed to sign up for the event.", type: "error" });
        } finally {
            setLoadingEvent(null);
        }
    };

    if (loading) {
        return (
            <>
                <NavBar />
                <DashboardSkeleton />
            </>
        );
    }

    return (
        <>
            <NavBar />
            <div className="py-20 px-4 flex flex-col items-center justify-center mx-auto max-w-7xl">
                {alert && (
                    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
                        <Alert
                            message={alert.message}
                            type={alert.type}
                            onClose={() => setAlert(null)}
                        />
                    </div>
                )}
                <GroupSection
                    groupDetails={groupDetails}
                    openEventGroupPage={openEventGroupPage}
                    userId={user._id}
                />
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
                />
            </div>
        </>
    );
};
