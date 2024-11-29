import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputText from '../atoms/InputText'; // Custom input component
import Buttons from '../atoms/Buttons'; // Custom button component
import Alert from '../atoms/Alert'; // Custom alert component
import { Link } from 'react-router-dom';
import axios from 'axios';
import { resetPassword } from '../../api/apiService';

export const ForgotPassword = () => {
          const [email, setEmail] = useState('');
          const [message, setMessage] = useState('');
          const [error, setError] = useState('');
          const navigate = useNavigate();

          const handleSubmit = async (e) => {
                    e.preventDefault();

                    try {
                              const response = await resetPassword({ email });

                              // Handle the response from the server
                              if (response.status === 200) {
                                        setMessage('Password reset link has been sent to your email.');
                                        setError('');
                                        setEmail('');
                              }
                    } catch (error) {
                              setError(error.response.message || 'An error occurred. Please try again.');
                              setMessage('');
                    }
          };

          return (
                    <div className="flex flex-grow h-screen justify-center items-center bg-white px-6 py-6">
                              <form onSubmit={handleSubmit}>
                                        <h2 className="text-center">Forgot Password</h2>
                                        {/* message or alert */}

                                        
                                        {message && <Alert message={message} className="flex items-center p-4 mb-4 text-[#166534] border-t-4 border-[#86efac] bg-[#f0fdf4]"
                                        role="alert"/>}
                                        {error && <Alert message={error} className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50"
                                        role="alert"/>}

                                        <div>
                                                  <InputText
                                                            type="email"
                                                            placeholder="Enter your email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            required
                                                  />
                                        </div>

                                        <div className="mt-4">
                                                  <Buttons
                                                            type="submit"
                                                            value="Send Reset Link"
                                                            className="bg-blue-600 hover:bg-blue-800"
                                                            onClick={handleSubmit}
                                                  />
                                        </div>

                                        <div className="text-center mt-4">
                                                  <p className="text-gray-700">
                                                            Remembered your password?{' '}
                                                            <Link to="/login" className="text-blue-600 hover:underline">
                                                                      Login
                                                            </Link>
                                                  </p>
                                        </div>
                              </form>
                    </div>
          );
};
