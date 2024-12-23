import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, fetchCities, fetchActivitiesCategories } from "../../api/apiService"; // Adjust API imports
import { AuthContext } from "../../contexts/AuthContext";
import NavBar from "./NavBar";

export const EditEvent = () => {
          const { user } = useContext(AuthContext);
          const [formData, setFormData] = useState({
                    title: "",
                    city: "",
                    dateTime: "",
                    category: "",
                    description: "",
                    photos: [], // Array of photos
          });
          const [loading, setLoading] = useState(true);
          const [error, setError] = useState(null);
          const [cities, setCities] = useState([]);
          const [categories, setCategories] = useState([]);
          const { authToken } = useContext(AuthContext);

          const { id } = useParams();
          const navigate = useNavigate();

          useEffect(() => {
                    const fetchData = async () => {
                              try {
                                        setLoading(true);

                                        // Fetch event details
                                        const eventResponse = await getEventById(authToken, id);
                                        const fetchedEvent = eventResponse.data;

                                        // Fetch cities and categories for selection
                                        const citiesResponse = await fetchCities(authToken);
                                        const categoriesResponse = await fetchActivitiesCategories(authToken);

                                        console.log("Categories Response:", categoriesResponse);

                                        setCities(citiesResponse.data || []);
                                        setCategories(categoriesResponse.data || []); // Use `.data` to access the array

                                        if (fetchedEvent) {
                                                  setFormData({
                                                            title: fetchedEvent.title || "",
                                                            city: fetchedEvent.city?._id || "",
                                                            dateTime: new Date(fetchedEvent.dateTime).toISOString().slice(0, 16),
                                                            category: fetchedEvent.category?._id || "",
                                                            description: fetchedEvent.description || "",
                                                            photos: fetchedEvent.photos || [],
                                                  });
                                                  debugger;
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

                    debugger
                    fetchData();
          }, [id, authToken]);

          const handleChange = (e) => {
                    const { name, value } = e.target;
                    setFormData({
                              ...formData,
                              [name]: value,
                    });
          };

          const handleFileChange = (e) => {
                    const files = Array.from(e.target.files);
                    setFormData({
                              ...formData,
                              photos: files,
                    });
          };

          const handleSubmit = async (e) => {
                    e.preventDefault();
                    try {
                              const response = await updateEvent(authToken, id, formData);
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

          if (loading) return <p className="text-center text-lg">Loading event details...</p>;
          if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;

          return (
                    <>
                              <NavBar />
                              <div className="max-w-4xl mx-auto p-8 my-4">
                                        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
                                                  <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Edit Event</h1>

                                                  {/* Title */}
                                                  <div className="mb-4">
                                                            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
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

                                                  {/* City */}
                                                  <div className="mb-4">
                                                            <label htmlFor="city" className="block text-gray-700 font-semibold mb-2">City</label>
                                                            <select
                                                                      id="city"
                                                                      name="city"
                                                                      value={formData.city}
                                                                      onChange={handleChange}
                                                                      className="w-full p-2 border rounded"
                                                                      required
                                                            >º
                                                                      <option value="">Select a city</option>
                                                                      {cities.map((city) => (
                                                                                <option key={city._id} value={city._id}>
                                                                                          {city.name}
                                                                                </option>
                                                                      ))}
                                                            </select>
                                                  </div>

                                                  {/* Date & Time */}
                                                  <div className="mb-4">
                                                            <label htmlFor="dateTime" className="block text-gray-700 font-semibold mb-2">Date & Time</label>
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

                                                  {/* Category */}
                                                  <div className="mb-4">
                                                            <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Category</label>
                                                            <div className="mb-4">
                                                                      
                                                                      <select
                                                                                id="category"
                                                                                name="category"
                                                                                value={formData.category} // Ensure correct binding
                                                                                onChange={handleChange}
                                                                                className="w-full p-2 border rounded"
                                                                                required
                                                                      >
                                                                                <option value="">Select a category</option>
                                                                                {categories.map((category) => (
                                                                                          <option key={category._id} value={category._id}>
                                                                                                    {category.categoryName} {/* Adjusted to display `categoryName` */}
                                                                                          </option>
                                                                                ))}
                                                                      </select>
                                                            </div>
                                                  </div>

                                                  {/* Description */}
                                                  <div className="mb-4">
                                                            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
                                                            <textarea
                                                                      id="description"
                                                                      name="description"
                                                                      value={formData.description}
                                                                      onChange={handleChange}
                                                                      className="w-full p-2 border rounded"
                                                                      rows="4"
                                                                      required
                                                            />
                                                  </div>

                                                  {/* Photos */}
                                                  <div className="mb-6">
                                                            <label htmlFor="photos" className="block text-gray-700 font-semibold mb-2">Photos</label>
                                                            <input
                                                                      type="file"
                                                                      id="photos"
                                                                      multiple
                                                                      accept="image/*"
                                                                      onChange={handleFileChange}
                                                                      className="w-full p-2 border rounded"
                                                            />
                                                            {formData.photos && formData.photos.length > 0 && (
                                                                      <div className="grid grid-cols-2 gap-4 mt-4">
                                                                                {formData.photos.map((photo, index) => (
                                                                                          <img
                                                                                                    key={index}
                                                                                                    src={photo.preview || photo} // Adjust for local or existing images
                                                                                                    alt={`Event photo ${index + 1}`}
                                                                                                    className="rounded-lg shadow-md w-full h-auto object-cover"
                                                                                          />
                                                                                ))}
                                                                      </div>
                                                            )}
                                                  </div>

                                                  {/* Submit Button */}
                                                  <button
                                                            type="submit"
                                                            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                                  >
                                                            Save Changes
                                                  </button>
                                        </form>
                              </div>
                    </>
          );
};
