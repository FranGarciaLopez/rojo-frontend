import React, { useState, useRef, useContext } from 'react';
import axios from 'axios';

import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import InputText from '../atoms/InputText';
import Buttons from '../atoms/Buttons';
import Alert from '../atoms/Alert';


export const LoginFrom = () => {

          const [email, setEmail] = useState('');
          const [password, setPassword] = useState('');
          const { login } = useContext(AuthContext);
          const navigate = useNavigate();

          const [error, setError] = useState('');

          const emailRef = useRef(null);
          const passwordRef = useRef(null);

          const handleSubmit = async (e) => {
                    e.preventDefault();

                    axios.post('http://localhost:3000/login', {
                              email,
                              password,
                    })
                              .then((response) => {
                                        const token = response.data.token;
                                        login(token);
                                        navigate('/dashboard');
                              })
                              .catch((error) => {
                                        setError(error.response.data)
                              });

          };

          return (
                    <div className="flex flex-grow justify-center items-center bg-white">
                              <form
                                        onSubmit={handleSubmit}
                                        className="bg-white p-8 m-8 rounded-lg w-full max-w-md space-y-4"
                              >
                                        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
                                        {error && <Alert message={error} />}
                                        
                                        <div>
                                                  <InputText
                                                            type="email"
                                                            placeholder="Email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            ref={emailRef}
                                                            className="bg-white border border-gray-300 text-gray-800 text-sm rounded-lg p-2.5"
                                                            required
                                                  />
                                        </div>

                                        <div>
                                                  <InputText
                                                            type="password"
                                                            placeholder="Password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            ref={passwordRef}
                                                            className="bg-white border border-gray-300 text-gray-800 text-sm rounded-lg p-2.5"
                                                            required
                                                  />
                                        </div>

                                        <div>
                                                  <Buttons
                                                            type="submit"
                                                            value="Register"
                                                            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                                                  />
                                        </div>
                                        <div className="text-center">
                                                  <p className="text-gray-700 text-sm">
                                                            Don't have an account?{' '}
                                                            <Link to="/register" className="text-blue-600 hover:underline">
                                                                      Register
                                                            </Link>
                                                  </p>
                                        </div>
                              </form>

                    </div>
          );
};
