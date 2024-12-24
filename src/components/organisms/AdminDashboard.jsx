import React, { useState, useEffect, useContext } from "react";
import NavBar from "../molecules/NavBar";
import { AuthContext } from "../../contexts/AuthContext";
import { getUsers, getEvents, getEventById } from "../../api/apiService";
import Pagination from "../molecules/Pagination";
import Table from "../molecules/Table";
import GridSection from "../atoms/GridSection";
import { EventsTable } from "../molecules/EventsTable";
import { useNavigate } from "react-router-dom";
import { EditEvent } from "../molecules/EditEvent";
export const AdminDashboard = () => {
          const [users, setUsers] = useState([]);
          const [events, setEvents] = useState([]);
          const [loading, setLoading] = useState(true);
          const { authToken } = useContext(AuthContext);
          const { user } = useContext(AuthContext);
          const [currentPageUsers, setCurrentPageUsers] = useState(1);
          const [currentPageEvents, setCurrentPageEvents] = useState(1);
          const usersPerPage = 5;
          const eventsPerPage = 5; // Adjust this as needed

          const indexOfLastUser = currentPageUsers * usersPerPage;
          const indexOfFirstUser = indexOfLastUser - usersPerPage;
          const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

          const indexOfLastEvent = currentPageEvents * eventsPerPage;
          const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
          const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

          const navigate = useNavigate();

          useEffect(() => {
                    const fetchData = async () => {
                              try {
                                        setLoading(true);
                                        const usersResponse = await getUsers();
                                        setUsers(usersResponse.data.users);

                                        const eventsResponse = await getEvents(authToken);
                                        if (Array.isArray(eventsResponse.data)) {
                                                  setEvents(eventsResponse.data);
                                        } else {
                                                  console.error("Expected events data to be an array, got:", eventsResponse.data);
                                        }
                              } catch (error) {
                                        console.error("Error fetching data:", error);
                              } finally {
                                        setLoading(false);
                              }
                    };

                    fetchData();
          }, [authToken]);

          // Calculate total pages for users and events
          const totalPagesUsers = Math.ceil(users.length / usersPerPage);
          const totalPagesEvents = Math.ceil(events.length / eventsPerPage);

          const pageNumbersUsers = [];
          const pageNumbersEvents = [];

          for (let i = 1; i <= totalPagesUsers; i++) {
                    pageNumbersUsers.push(i);
          }

          for (let i = 1; i <= totalPagesEvents; i++) {
                    pageNumbersEvents.push(i);
          }

          const handlePageClickUsers = (pageNumber) => {
                    setCurrentPageUsers(pageNumber);
          };

          const handlePageClickEvents = (pageNumber) => {
                    setCurrentPageEvents(pageNumber);
          };

          const handleEditEvent = (event) => {

                    if (event && event._id) {
                              navigate(`/edit-event/${event._id}`);
                              console.log("Navigating to edit event with ID:", event._id);
                    } else {
                              console.error('Event ID is missing or event is undefined');
                    }
          };

          const handleDeleteEvent = async (eventId) => {
        
            const confirmDelete = window.confirm("Are you sure you want to delete this event?");
            if (!confirmDelete) return; 
          
            try {
              const response = await fetch(`http://localhost:3000/events/eventdelete/${eventId}`, {
                method: 'DELETE',
              });
          
              if (response.ok) {
              
                const updatedEventsResponse = await getEvents(authToken); 
                if (Array.isArray(updatedEventsResponse.data)) {
                  setEvents(updatedEventsResponse.data); 
                } else {
                  console.error("Expected events data to be an array, got:", updatedEventsResponse.data);
                }
          
                alert("Event deleted successfully"); 
              } else {
                throw new Error("Error deleting event");
              }
            } catch (error) {
              console.error("Error deleting event", error);
              alert("Error deleting event");
            }
          };
          

          return (
                    <>
                              <NavBar />
                              <div className="p-10 max-w-6xl mx-auto">
                                        <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

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
                                                                      <p className="text-xl">{user.organizedEvents}</p>
                                                            </div>
                                                  </GridSection>
                                        </div>

                                        {/* Manage Events Section */}
                                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Events</h2>
                                        <button
                                                  onClick={() => navigate("/CreateEventForm")}
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
                                                                      onEdit={event => handleEditEvent(event)}
                                                                      onDelete={(id ) => handleDeleteEvent(id)}
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
                                        <Table columns={["First Name", "Email", "Role", "Actions"]} data={currentUsers} />
                                        <Pagination
                                                  currentPage={currentPageUsers}
                                                  totalPages={totalPagesUsers}
                                                  pageNumbers={pageNumbersUsers}
                                                  handlePageClick={handlePageClickUsers}
                                        />
                              </div>
                    </>
          );
};
