import React, { useState, useRef } from 'react';
import axios from 'axios';
import InputText from '../atoms/InputText';
import Buttons from '../atoms/Buttons';

export const LoginFrom = () => {

          const [email, setEmail] = useState('');
          const [password, setPassword] = useState('');
          const [error, setError] = useState('');

          const emailRef = useRef(null);
          const passwordRef = useRef(null);

          const handleSubmit = (e) => {
                    e.preventDefault();
                    axios.post('http://localhost:3001/login', {
                              email,
                              password
                    }).then(response => {
                              localStorage.setItem('token', response.data.token);
                    }).catch(error => {
                              setError(error.response.data.message)
                    })
          };

          return (
                    <div className="flex justify-center items-center h-screen bg-gray-100">
                              <form
                                        onSubmit={handleSubmit}
                                        className="bg-white p-8 m-8 rounded-lg shadow-lg w-full max-w-md space-y-4"
                              >
                                        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                                        <div>
                                                  <InputText
                                                            type="email"
                                                            placeholder="Email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            ref={emailRef}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                                                  />
                                        </div>

                                        <div>
                                                  <InputText
                                                            type="password"
                                                            placeholder="Password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            ref={passwordRef}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                                                  />
                                        </div>

                                        <Buttons
                                                  type="submit"
                                                  value="Login"
                                                  className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300"
                                        />
                              </form>
                    </div>
          );
}