import React, { useState, useRef, useContext , useEffect} from 'react';
import axios from 'axios';

import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import InputText from '../atoms/InputText';
import Buttons from '../atoms/Buttons';
import Alert from '../atoms/Alert';



export const RegisterForm = () => {

          const [firstname, setFirstname] = useState('');
          const [lastname, setLastname] = useState('');
          const [email, setEmail] = useState('');
          const [password, setPassword] = useState('');
          const [city, setCity] = useState('');
          const [dateOfBirth, setDateOfBirth] = useState('');
          const { register } = useContext(AuthContext);
          const navigate = useNavigate();
          const [error, setError] = useState('');
          const [cities, setCities] = useState([]);

          const refs = {
                    firstname: useRef(null),
                    lastname: useRef(null),
                    email: useRef(null),
                    password: useRef(null),
                    city: useRef(null),
                    dateOfBirth: useRef(null),
          };


          useEffect(() => {
            const fetchCities = async () => {
              try {
                const response = await axios.get('http://localhost:3000/cities/cities'); 
                setCities(response.data); 
              } catch (error) {
                console.error('Error fetching cities:',  error.message);
              }
            };
        
            fetchCities();
          }, []);

          const handleSubmit = async (e) => {
                    e.preventDefault();

                    axios.post('http://localhost:3000/register', {
                              firstname,
                              lastname,
                              email,
                              password,
                              city,
                              dateOfBirth,
                    })
                              .then((response) => {
                                        const token = response.data.token;
                                        register(token);
                                        navigate('/login');
                              })
                              .catch((error) => {
                                        
                                        setError(error.message || "An unexpected error occurred");
                              });
                    
                          
          };

          return (
                    <div className="flex flex-grow justify-center items-center bg-white">
                              <form
                                        onSubmit={handleSubmit}
                                        className="bg-white p-8 m-8 rounded-lg w-full max-w-md"
                              >
                                        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                                        {error && <Alert message={error} />}

                                        <div className="space-y-5">
                                                  
                                                  <div>
                                                            <InputText
                                                                      type="text"
                                                                      placeholder="First Name"
                                                                      value={firstname}
                                                                      onChange={(e) => setFirstname(e.target.value)}
                                                                      ref={refs.firstname}
                                                                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                                                                      required
                                                            />
                                                  </div>

                                                  <div>
                                                            <InputText
                                                                      type="text"
                                                                      placeholder="Last Name"
                                                                      value={lastname}
                                                                      onChange={(e) => setLastname(e.target.value)}
                                                                      ref={refs.lastname}
                                                                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                                                                      required
                                                            />
                                                  </div>

                                                  <div>
                                                            <InputText
                                                                      type="email"
                                                                      placeholder="Email"
                                                                      value={email}
                                                                      onChange={(e) => setEmail(e.target.value)}
                                                                      ref={refs.email}
                                                                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                                                                      required
                                                            />
                                                  </div>

                                                  <div>
                                                            <InputText
                                                                      type="password"
                                                                      placeholder="Password"
                                                                      value={password}
                                                                      onChange={(e) => setPassword(e.target.value)}
                                                                      ref={refs.password}
                                                                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                                                                      required
                                                            />
                                                  </div>

                                                  <div>
                                                            <select
                                                                     
                                                                      value={city}
                                                                      onChange={(e) => setCity(e.target.value)}
                                                                      ref={refs.city}
                                                                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
                                                                      required
                                                                      >
                                                                        <option value="">     Choose your City     </option>
                                                                        {cities.map((city) =>(
                                                                            <option key ={city._id} value={city.name}>
                                                                                {city.name}
                                                                            </option>
                                                                        ))}
               
                                                                      </select>
                                                            
                                                  </div>

                                                  <div>
                                                            <InputText
                                                                      type="date"
                                                                      placeholder="Date of Birth"
                                                                      value={dateOfBirth}
                                                                      onChange={(e) => setDateOfBirth(e.target.value)}
                                                                      ref={refs.dateOfBirth}
                                                                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                                                                      required
                                                            />
                                                  </div>

                                                  <div>
                                                            <Buttons
                                                                      type="submit"
                                                                      value="Register"
                                                                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                            />
                                                  </div>
                                        </div>

                              </form>
                    </div>
          );
};