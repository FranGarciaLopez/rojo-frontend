import React, { useState, useEffect, useContext } from "react";
import NavBar from "../molecules/NavBar";
import { AuthContext } from "../../contexts/AuthContext";
import { getUsers, getEvents, deleteUserByAdmin, createGroups, deleteGroups } from "../../api/apiService";
import Pagination from "../molecules/Pagination";
import Table from "../molecules/Table";
import GridSection from "../atoms/GridSection";
import Buttons from "../atoms/Buttons";
import AdminDashboardSkeleton from "../skeletons/AdminDashboardSkeleton";
import { EventsTable } from "../molecules/EventsTable";
import { useNavigate } from "react-router-dom";
import Alert from "../atoms/Alert";

export const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const { authToken, user } = useContext(AuthContext);
  const [currentPageUsers, setCurrentPageUsers] = useState(1);
  const [currentPageEvents, setCurrentPageEvents] = useState(1);
  const usersPerPage = 5;
  const eventsPerPage = 5;

  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch users
        const usersResponse = await getUsers();
        setUsers(usersResponse.data.users);

        // Fetch events
        const eventsResponse = await getEvents(authToken);
        if (Array.isArray(eventsResponse.data)) {
          setEvents(eventsResponse.data);
        } else {
          console.error("Expected events data to be an array.");
        }
      } catch (error) {
        setAlert({ message: "Error fetching data.", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authToken]);

  const totalPagesUsers = Math.ceil(users.length / usersPerPage);
  const totalPagesEvents = Math.ceil(events.length / eventsPerPage);

  const pageNumbersUsers = Array.from(
    { length: totalPagesUsers },
    (_, i) => i + 1
  );
  const pageNumbersEvents = Array.from(
    { length: totalPagesEvents },
    (_, i) => i + 1
  );

  const indexOfLastUser = currentPageUsers * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const indexOfLastEvent = currentPageEvents * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageClickUsers = (pageNumber) => setCurrentPageUsers(pageNumber);
  const handlePageClickEvents = (pageNumber) => setCurrentPageEvents(pageNumber);

  const handleEditEvent = (event) => {
    if (event && event._id) {
      navigate(`/edit-event/${event._id}`);
    } else {
      setAlert({ message: "Event ID is missing or undefined.", type: "error" });
    }
  };

  const handleCreateEvent = () => {
    navigate("/create-event");
  };

  const handleCreateGroup = async () => {
    try {
      const response = await createGroups(authToken);

      if (response.status === 200 || response.status === 201) {
        setAlert({ message: "Groups created successfully.", type: "success" });
      } else {
        const errorData = await response.json();
        setAlert({
          message: errorData.message || "Error creating groups.",
          type: "error",
        });
      }
    } catch (error) {
      setAlert({ message: "Error creating groups. Please try again later.", type: "error" });
      console.error("Error creating groups:", error);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      const response = await deleteGroups(authToken);

      if (response.status === 200) {
        setAlert({ message: "Groups deleted successfully.", type: "success" });
      } else {
        const errorData = await response.json();
        setAlert({
          message: errorData.message || "Error deleting groups.",
          type: "error",
        });
      }
    } catch (error) {
      setAlert({ message: "Error deleting groups. Please try again later.", type: "error" });
      console.error("Error deleting groups:", error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${baseURL}/events/eventdelete/${eventId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.ok) {
        const updatedEventsResponse = await getEvents(authToken);
        if (Array.isArray(updatedEventsResponse.data)) {
          setEvents(updatedEventsResponse.data);
        } else {
          console.error("Expected events data to be an array.");
        }
        setAlert({ message: "Event deleted successfully.", type: "success" });
      } else {
        throw new Error("Error deleting event.");
      }
    } catch (error) {
      setAlert({ message: "Error deleting event.", type: "error" });
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const response = await deleteUserByAdmin(authToken, userId);

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        setAlert({ message: "User deleted successfully.", type: "success" });
      } else {
        const errorData = await response.json();
        setAlert({
          message: errorData.message || "Failed to delete user. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setAlert({ message: "Error deleting user. Please try again later.", type: "error" });
    }
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <AdminDashboardSkeleton />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="relative">
        {/* Alert Section */}
        {alert && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
            <Alert
              message={alert.message}
              type={alert.type}
              onClose={() => setAlert(null)}
            />
          </div>
        )}

        <div className="px-4 py-20 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">
            Admin Dashboard
          </h1>

          {/* Buttons Section */}
          <div className="flex gap-4 mb-8">
            <Buttons
              value="Create Event"
              className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
              onClick={handleCreateEvent}
            />
            <Buttons
              value="Create Groups"
              className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
              onClick={handleCreateGroup}
            />
            <Buttons
              value="Delete Groups"
              className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
              onClick={handleDeleteGroup}
            />
          </div>

          {/* Analytics Section */}
          <div className="my-8">
            <h2>Analytics</h2>
            <GridSection>
              <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold">Total Users</h3>
                <p className="text-xl">{users.length}</p>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold">Total Events</h3>
                <p className="text-xl">{events.length}</p>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold">Created Events</h3>
                <p className="text-xl">{user?.organizedEvents || 0}</p>
              </div>
            </GridSection>
          </div>

          {/* Manage Events Section */}
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Events</h2>
          {loading ? (
            <p>Loading events...</p>
          ) : (
            <>
              <EventsTable
                columns={["title", "city", "dateTime", "category"]}
                data={currentEvents}
                onEdit={handleEditEvent}
                onDelete={handleDeleteEvent}
              />
              <Pagination
                currentPage={currentPageEvents}
                totalPages={totalPagesEvents}
                pageNumbers={pageNumbersEvents}
                handlePageClick={handlePageClickEvents}
              />
            </>
          )}

          {/* Manage Users Section */}
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Users</h2>
          <Table
            columns={["First Name", "Email", "Role", "Actions"]}
            data={currentUsers}
            onDelete={handleDeleteUser}
          />
          <Pagination
            currentPage={currentPageUsers}
            totalPages={totalPagesUsers}
            pageNumbers={pageNumbersUsers}
            handlePageClick={handlePageClickUsers}
          />
        </div>
      </div>
    </>
  );
};
