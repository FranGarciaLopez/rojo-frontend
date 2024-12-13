import React, { useState, useRef, useContext, useEffect } from 'react';
import axios from 'axios';

import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCities } from '../../hooks/useCities';

import InputText from '../atoms/InputText';
import Buttons from '../atoms/Buttons';
import Alert from '../atoms/Alert';
import { registerUser } from '../../api/apiService';


export const RegisterForm = () => {

       const [firstname, setFirstname] = useState('');
       const [lastname, setLastname] = useState('');
       const [email, setEmail] = useState('');
       const [password, setPassword] = useState('');

       const [dateOfBirth, setDateOfBirth] = useState('');
       const { register } = useContext(AuthContext);
       const navigate = useNavigate();
       const [error, setError] = useState('');

       const [city, setCity] = useState('');
       const { cities, loading } = useCities();

       const refs = {
              firstname: useRef(null),
              lastname: useRef(null),
              email: useRef(null),
              password: useRef(null),
              city: useRef(null),
              dateOfBirth: useRef(null),
       };

       useEffect(() => {
              if (loading) return;
              // fetch the cities
              if (cities.length > 0) {
                     setCity(cities[0].name);
              }
       }, [loading]);


       const handleSubmit = async (e) => {
              e.preventDefault();
              try {
                     const response = await registerUser({
                            firstname,
                            lastname,
                            email,
                            password,
                            city,
                            dateOfBirth,
                     });

       debugger;

                     if (response.error) {
                            setError(response.error);
                            return;
                     }
                     register(response);
                     navigate('/login');
              } catch (error) {
                     setError(error.message);
              }
       }

       return (
              <div className="flex flex-grow py-6 px-6 justify-center items-center bg-white">
                     <form
                            onSubmit={handleSubmit}
                     >
                            <h2 className='text-center'>Register</h2>
                            {error && <Alert message={error} />}

                            <div className="space-y-5">

                                   <div>
                                          <InputText
                                                 type="text"
                                                 placeholder="First Name"
                                                 value={firstname}
                                                 onChange={(e) => setFirstname(e.target.value)}
                                                 ref={refs.firstname}
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
                                                 required
                                          />
                                   </div>

                                   <div>
                                          <select

                                                 value={city}
                                                 onChange={(e) => setCity(e.target.value)}
                                                 ref={refs.city}
                                                 required
                                          >
                                                 <option value="">     Choose your City     </option>
                                                 {cities.map((city) => (
                                                        <option key={city._id} value={city.name}>
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
                                                 required
                                          />
                                   </div>

                                   <div>
                                          <Buttons
                                                 type="submit"
                                                 value="Register"
                                                 className="bg-blue-500 hover:bg-blue-700"
                                          />
                                   </div>
                            </div>

                     </form>
              </div>
       );
};