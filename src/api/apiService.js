import axios from 'axios';

const apiClient = axios.create({
          baseURL: 'http://localhost:3000',
          headers: { 'Content-Type': 'application/json' },
});

export const fetchCities = () => apiClient.get('/cities/cities');
export const fetchUserData = (authToken) =>
          apiClient.get('/user', { headers: { Authorization: `Bearer ${authToken}` } });

export const getUsers = () => apiClient.get('/users');
export const registerUser = (userData) => apiClient.post('/register', userData);
export const loginUser = (userData) => apiClient.post('/login', userData);
export const fetchActivitiesCategories = () => apiClient.get('/categories/categories');
export const updateUserPreferences = (authToken, preferences) =>
          apiClient.put('/update-preferences', preferences, {
                    headers: { Authorization: `Bearer ${authToken}` },
          });

export const resetPassword = async ({ email }) => {
          const response = await apiClient.put('/forgotpassword', { email });
          return response;
};

export const getEvents = (authToken) => {
          const response = apiClient.get('/events/events', {
                    headers: { Authorization: `Bearer ${authToken}` },
          });
          return response;

};

export const getEventById = (authToken, id) => {
          const response = apiClient.get(`/events/events/${id}`, {
                    headers: { Authorization: `Bearer ${authToken}` },
          });
          return response;
}