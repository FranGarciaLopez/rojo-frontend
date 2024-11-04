import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
          const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);
          const [user, setUser] = useState(null);
          const [loading, setLoading] = useState(true);

          useEffect(() => {
                    
                    if (authToken) {
                              axios.get('http://localhost:3000/user', {
                                        headers: {
                                                  Authorization: `Bearer ${authToken}`,
                                        },
                              })
                                        .then((response) => {
                                                  setUser(response.data);
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
                    <AuthContext.Provider value={{ authToken, user, login, register, logout, loading }}>
                              {children}
                    </AuthContext.Provider>
          );
};

export { AuthContext, AuthProvider };
