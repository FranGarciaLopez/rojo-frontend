import React, { useState, useRef, useContext } from 'react';
import axios from 'axios';

import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import InputText from '../atoms/InputText';
import Buttons from '../atoms/Buttons';
import Alert from '../atoms/Alert';
import { loginUser } from '../../api/apiService';

export const LoginFrom = () => {
          const [email, setEmail] = useState('');
          const [password, setPassword] = useState('');
          const [error, setError] = useState('');

          const { login } = useContext(AuthContext);
          const navigate = useNavigate();

          const handleSubmit = async (e) => {
                    e.preventDefault();

                    try {
                              // Call the loginUser function from the API client
                              const response = await loginUser({ email, password });

                              const token = response.data.token;
                              const requiresOnboarding = response.data.requiresOnboarding;
                              const isAdmin = response.data.isAdmin;
                              login(token); 

                              if (requiresOnboarding) {
                                        navigate('/onboarding');
                              } else if (isAdmin) {
                                        navigate('/admin');
                              } else {
                                        navigate('/dashboard');
                              }
                    } catch (error) {
                              setError(error.response?.data?.message || 'Login failed');
                    }
          };

          return (
                    <div className="flex flex-grow justify-center items-center bg-white px-6 py-6">
                              <form onSubmit={handleSubmit}>
                                        <h2 className="text-center">Login</h2>
                                        {error && <Alert message={error} />}

                                        <div>
                                                  <InputText
                                                            type="email"
                                                            placeholder="Email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            required
                                                  />
                                        </div>

                                        <div>
                                                  <InputText
                                                            type="password"
                                                            placeholder="Password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            required
                                                  />
                                        </div>

                                        <div>
                                                  <Buttons
                                                            type="submit"
                                                            value="Login"
                                                            className="bg-blue-600 hover:bg-blue-800"
                                                  />
                                        </div>

                                        <div className="text-center">
                                                  <p className="text-gray-700">
                                                            Don't have an account?{' '}
                                                            <Link to="/register" className="text-blue-600 hover:underline">
                                                                      Register
                                                            </Link>
                                                  </p>
                                                  <p className="text-gray-700">
                                                            <Link to="/forgotpassword" className="text-blue-600 hover:underline">
                                                                      Forgot Password
                                                            </Link>?
                                                  </p>
                                        </div>
                              </form>
                    </div>
          );
};
