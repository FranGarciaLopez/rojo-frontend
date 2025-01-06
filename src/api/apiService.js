import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
          baseURL: baseURL,
          headers: { 'Content-Type': 'application/json' },
});

// Authentication
export const registerUser = (userData) => apiClient.post('/register', userData);
export const loginUser = (userData) => apiClient.post('/login', userData);
export const fetchUserData = (authToken) =>
          apiClient.get('/user', { headers: { Authorization: `Bearer ${authToken}` } });
export const resetPassword = async ({ email }) => {
          const response = await apiClient.put('/forgotpassword', { email });
          return response;
};

// Users
export const getUsers = () => apiClient.get('/users');
export const updateUserPreferences = (authToken, preferences) =>
          apiClient.put('/update-preferences', preferences, {
                    headers: { Authorization: `Bearer ${authToken}` },
          });
export const patchUser = async (authToken, updatedFields) => {
          const baseURL = import.meta.env.VITE_API_BASE_URL;

          try {
                    const response = await fetch(`${baseURL}/user`, {
                              method: "PATCH",
                              headers: {
                                        "Content-Type": "application/json",
                                        Authorization: `Bearer ${authToken}`,
                              },
                              body: JSON.stringify(updatedFields),
                    });

                    return response; // Ensure the raw Response object is returned
          } catch (error) {
                    console.error("Error in patchUser:", error);
                    throw error; // Propagate the error to the calling function
          }
};


export const deleteUser = async (authToken) => {
          const baseURL = import.meta.env.VITE_API_BASE_URL;

          try {
                    const response = await fetch(`${baseURL}/profile`, {
                              method: "DELETE",
                              headers: {
                                        Authorization: `Bearer ${authToken}`,
                              },
                    });

                    return response; // Ensure the raw Response object is returned
          } catch (error) {
                    console.error("Error in deleteUser:", error);
                    throw error; // Propagate the error to the calling function
          }
};

export const deleteUserByAdmin = async (authToken, userId) => {
          const baseURL = import.meta.env.VITE_API_BASE_URL;

          try {
                    const response = await fetch(`${baseURL}/user/${userId}`, {
                              method: "DELETE",
                              headers: {
                                        Authorization: `Bearer ${authToken}`,
                              },
                    });

                    return response; // Return the raw response
          } catch (error) {
                    console.error("Error in deleteUserByAdmin:", error);
                    throw error;
          }
};


// Cities and Categories
export const fetchCities = () => apiClient.get('/cities/cities');
export const fetchActivitiesCategories = () => apiClient.get('/categories/categories');

// Events
export const getEvents = (authToken) =>
          apiClient.get('/events/events', {
                    headers: { Authorization: `Bearer ${authToken}` },
          });

export const getEventById = (authToken, id) =>
          apiClient.get(`/events/${id}`, {
                    headers: { Authorization: `Bearer ${authToken}` },
          });

export const updateEvent = (authToken, event, data) =>
          apiClient.patch(`/events/editevent/${event}`, data, {
                    headers: { Authorization: `Bearer ${authToken}` },
          });

// Blogs
export const getBlogs = (authToken) =>
          apiClient.get('/blogs/blogs', {
                    headers: { Authorization: `Bearer ${authToken}` },
          });

export const getBlogById = async (authToken, id) => {
          try {
                    const response = await apiClient.get(`/blogs/${id}`, {
                              headers: { Authorization: `Bearer ${authToken}` },
                    });
                    return response.data.blog;
          } catch (error) {
                    console.error("Error fetching blog by ID:", error.response?.data || error.message);
                    throw error;
          }
};
