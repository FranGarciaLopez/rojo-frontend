import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
          const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);
          const [user, setUser] = useState(null);
          const [loading, setLoading] = useState(true);


          // Fetch user data from the backend when the token is available
          useEffect(() => {
                    if (authToken) {
                              axios
                                        .get('http://localhost:3000/user', {
                                                  headers: { Authorization: `Bearer ${authToken}` },
                                        })
                                        .then((response) => {
                                                  setUser(response.data.user); // Ensure `response.data.user` includes `isAdministrator`
                                        })
                                        .catch((error) => {
                                                  console.error(error);
                                                  logout();  // Si ocurre un error en la obtención de datos, logout
                                        })
                                        .finally(() => {
                                                  setLoading(false);
                                        });
                    } else {
                              setLoading(false);
                    }
          }, [authToken]);

          // Login function
          const login = (token) => {
                    setAuthToken(token);
                    localStorage.setItem('token', token); // Save token to localStorage
                    setLoading(true); // Start loading while fetching user data
          };

          // Register function (calls login after registration)
          const register = (token) => {
                    login(token);
          };

          // Logout function to clear auth state
          const logout = () => {
                    setAuthToken(null);
                    setUser(null);
                    localStorage.removeItem('token');
          };

          return (
                    <AuthContext.Provider value={{ authToken, user, login, register, logout, loading }}>
                              {children}
                    </AuthContext.Provider>
          );
};

export { AuthContext, AuthProvider };
