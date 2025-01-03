import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
          const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);
          const [user, setUser] = useState(null);
          const [loading, setLoading] = useState(true);
          const baseURL = import.meta.env.VITE_API_BASE_URL;

          useEffect(() => {
                    if (authToken) {
                              axios
                                        .get(`${baseURL}/user`, {
                                                  headers: { Authorization: `Bearer ${authToken}` },
                                        })
                                        .then((response) => {
                                                  setUser(response.data.user); 
                                        })
                                        .catch((error) => {
                                                  console.error(error);
                                                  logout();
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
                    localStorage.setItem('token', token);
                    setLoading(true);
          };

          const register = (token) => {
                    login(token);
          };

          const logout = () => {
                    setAuthToken(null);
                    setUser(null);
                    localStorage.removeItem('token');
          };

          return (
                    <AuthContext.Provider value={{ authToken, user, setUser, login, register, logout, loading }}>
                              {children}
                    </AuthContext.Provider>
          );
};

export { AuthContext, AuthProvider };
