import React, { useState, useEffect, useContext } from "react";
import NavBar from "../molecules/NavBar";
import { AuthContext } from "../../contexts/AuthContext";
import { getUsers, getEvents } from "../../api/apiService";
import Pagination from "../molecules/Pagination";
import Table from "../molecules/Table";
import GridSection from "../atoms/GridSection";
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

        <div className="p-10 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">
            Admin Dashboard
          </h1>

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
          <button
            onClick={() => navigate("/create-event")}
            className="mb-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            Create New Event
          </button>
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
