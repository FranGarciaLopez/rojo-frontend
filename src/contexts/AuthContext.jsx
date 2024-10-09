
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
          const [authToken, setAuthToken] = useState(null);
          const [user, setUser] = useState(null);

          useEffect(() => {
                    const token = localStorage.getItem('token');
                    if (token) {
                              setAuthToken(token);
                    }
          }, []);

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
                                        });
                    }
          }, [authToken]);

          const login = (token) => {
                    setAuthToken(token);
                    localStorage.setItem('token', token);
          };

          const register = (token) => {
                    setAuthToken(token);
                    localStorage.setItem('token', token);
          };

          const logout = () => {
                    setAuthToken(null);
                    localStorage.removeItem('token');
          };

          return (
                    <AuthContext.Provider value={{ authToken, user, login, register, logout }}>
                              {children}
                    </AuthContext.Provider>
          );
};

export { AuthContext, AuthProvider };