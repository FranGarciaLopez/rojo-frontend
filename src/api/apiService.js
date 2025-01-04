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

// Cities and Categories
export const fetchCities = () => apiClient.get('/cities/cities');
export const fetchActivitiesCategories = () => apiClient.get('/categories/categories');

// Events
export const getEvents = (authToken) =>
          apiClient.get('/events/events', {
                    headers: { Authorization: `Bearer ${authToken}` },
          });

export const getEventById = (authToken, id) =>
          apiClient.get(`/events/events/${id}`, {
                    headers: { Authorization: `Bearer ${authToken}` },
          });

export const updateEvent = (authToken, event, data) =>
          apiClient.patch(`/events/editevent/${event}`, data, {
                    headers: { Authorization: `Bearer ${authToken}` },
          });
