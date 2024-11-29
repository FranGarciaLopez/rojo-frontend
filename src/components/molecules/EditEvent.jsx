import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventById } from "../../api/apiService";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import NavBar from "./NavBar";
export const EditEvent = () => {
          const [event, setEvent] = useState(null);
          const [loading, setLoading] = useState(true);
          const [error, setError] = useState(null);
          const { authToken } = useContext(AuthContext);

          const [formData, setFormData] = useState({
                    title: "",
                    city: "",
                    dateTime: "",
                    category: "",
                    description: "",
          });

          const { id } = useParams();
          const navigate = useNavigate();

          useEffect(() => {
                    const fetchEvent = async () => {
                              try {
                                        setLoading(true);
                                        const response = await getEventById(authToken, id);
                                        const fetchedEvent = response.data;

                                        if (fetchedEvent) {
                                                  setEvent(fetchedEvent);
                                                  setFormData({
                                                            title: fetchedEvent.title,
                                                            city: fetchedEvent.city || "",
                                                            dateTime: new Date(fetchedEvent.dateTime).toISOString().slice(0, 16),
                                                            category: fetchedEvent.category || "",
                                                            description: fetchedEvent.description,
                                                  });
                                        } else {
                                                  setError("Event not found");
                                        }
                              } catch (error) {
                                        setError("Failed to load event data");
                                        console.error("Error fetching event:", error);
                              } finally {
                                        setLoading(false);
                              }
                    };

                    fetchEvent();
          }, [id]);

          const handleChange = (e) => {
                    const { name, value } = e.target;
                    setFormData({
                              ...formData,
                              [name]: value,
                    });
          };

          const handleSubmit = async (e) => {
                    e.preventDefault();
                    try {
                              const response = await updateEvent(id, formData);
                              if (response.status === 200) {
                                        navigate("/admin");
                              } else {
                                        setError("Failed to update event");
                              }
                    } catch (error) {
                              setError("Error updating event");
                              console.error("Error updating event:", error);
                    }
          };

          if (loading) return <p>Loading event details...</p>;
          if (error) return <p className="text-red-500">{error}</p>;

          return (
                    <>
                              <NavBar />
                              <div className="centered-elements">
                                        <form onSubmit={handleSubmit}>
                                                  <h1 className="text-3xl font-bold mb-4">Edit Event</h1>
                                                  <div className="mb-4">
                                                            <label htmlFor="title" className="block mb-1">Title</label>
                                                            <input
                                                                      type="text"
                                                                      id="title"
                                                                      name="title"
                                                                      value={formData.title}
                                                                      onChange={handleChange}
                                                                      className="w-full p-2 border rounded"
                                                                      required
                                                            />
                                                  </div>
                                                  <div className="mb-4">
                                                            <label htmlFor="city" className="block mb-1">City</label>
                                                            <input
                                                                      type="text"
                                                                      id="city"
                                                                      name="city"
                                                                      value={formData.city}
                                                                      onChange={handleChange}
                                                                      className="w-full p-2 border rounded"
                                                            />
                                                  </div>
                                                  <div className="mb-4">
                                                            <label htmlFor="dateTime" className="block mb-1">Date & Time</label>
                                                            <input
                                                                      type="datetime-local"
                                                                      id="dateTime"
                                                                      name="dateTime"
                                                                      value={formData.dateTime}
                                                                      onChange={handleChange}
                                                                      className="w-full p-2 border rounded"
                                                                      required
                                                            />
                                                  </div>
                                                  <div className="mb-4">
                                                            <label htmlFor="category" className="block mb-1">Category</label>
                                                            <input
                                                                      type="text"
                                                                      id="category"
                                                                      name="category"
                                                                      value={formData.category}
                                                                      onChange={handleChange}
                                                                      className="w-full p-2 border rounded"
                                                            />
                                                  </div>
                                                  <div className="mb-4">
                                                            <label htmlFor="description" className="block mb-1">Description</label>
                                                            <textarea
                                                                      id="description"
                                                                      name="description"
                                                                      value={formData.description}
                                                                      onChange={handleChange}
                                                                      className="w-full p-2 border rounded"
                                                                      rows="4"
                                                            />
                                                  </div>
                                                  <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                                            Save Changes
                                                  </button>
                                        </form>
                              </div>
                    </>
          );
};