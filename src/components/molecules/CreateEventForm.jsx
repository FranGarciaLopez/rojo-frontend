import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

import * as SubframeCore from "@subframe/core";
import NavBar from '../molecules/NavBar';
import InputText from "../atoms/InputText";
import Buttons from '../atoms/Buttons';
import { useNavigate } from 'react-router-dom';

export const CreateEvent = () => {
     const [photos, setPhotos] = useState([]);
     const [formData, setFormData] = useState({
          title: '',
          description: '',
          city: '',
          category: '',
          dateTime: ''
     });
     const [cities, setCities] = useState([]);
     const [categories, setCategories] = useState([]);
     const navigate = useNavigate();

     const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData(prevState => ({
               ...prevState,
               [name]: value
          }));
     };

     const handlePhotoUpload = (e) => {
          const files = Array.from(e.target.files);
          setPhotos(files);
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          const submissionData = new FormData();

          photos.forEach(photo => submissionData.append('photos', photo));
          Object.keys(formData).forEach(key => {
               submissionData.append(key, formData[key]);
          });

          try {
               await axios.post('http://localhost:3000/events', submissionData, {
                    headers: {
                         'Content-Type': 'multipart/form-data'
                    }
               });
               // Handle success
          } catch (error) {
               console.error('Error creating event:', error.message);
          }
     };

     useEffect(() => {
          const fetchCities = async () => {
               try {
                    const response = await axios.get('http://localhost:3000/cities/cities');
                    setCities(response.data);
               } catch (error) {
                    console.error('Error fetching cities:', error.message);
               }
          };
          fetchCities();

          const fetchCategories = async () => {
               try {
                    const response = await axios.get('http://localhost:3000/categories/categories');
                    setCategories(response.data);
               } catch (error) {
                    console.error('Error fetching categories:', error.message);
               }
          };
          fetchCategories();
     }, []);

     return (
          <>
               <NavBar />
               <div className="centered-elements flex-col gap-5">
                    <div className="mx-8 gap-2">
                         <i
                              className="fas fa-arrow-left cursor-pointer"
                              onClick={() => navigate(-1)}
                         ></i>
                         <span> Create New Event</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                         <div className="w-full flex flex-col items-start gap-6">
                              <label>Title</label>
                              <InputText
                                   type="text"
                                   name="title"
                                   placeholder="Title"
                                   value={formData.title}
                                   onChange={handleChange}
                                   required
                              />

                              <label>City</label>
                              <select
                                   name="city"
                                   value={formData.city}
                                   onChange={handleChange}
                                   required
                              >
                                   <option>Choose your City</option>
                                   {cities.map((city) => (
                                        <option key={city._id} value={city.name}>
                                             {city.name}
                                        </option>
                                   ))}
                              </select>

                              <label>Category</label>
                              <select
                                   name="category"
                                   value={formData.category}
                                   onChange={handleChange}
                                   required
                              >
                                   <option>Choose a Category</option>
                                   {categories.map((category) => (
                                        <option key={category._id} value={category.name}>
                                             {category.name}
                                        </option>
                                   ))}
                              </select>

                              <label>Description</label>
                              <textarea
                                   name="description"
                                   rows="5"
                                   placeholder="Description"
                                   value={formData.description}
                                   onChange={handleChange}
                                   required
                              />

                              <label>Date and Time</label>
                              <InputText
                                   type="datetime-local"
                                   name="dateTime"
                                   value={formData.dateTime}
                                   onChange={handleChange}
                                   required
                              />

                              <div className="upload-container shadow-3xl">
                                   <SubframeCore.Icon className="upload-icon" name="FeatherImage" />
                                   <div className="upload-text-container">
                                        <span>Drag photos here</span>
                                        <Buttons type="submit" value="Upload" className="upload-button" />
                                   </div>
                                   <span className="upload-support-text">
                                        Supported files: jpg, png, svg
                                   </span>
                              </div>

                         </div>

                         <Buttons
                              type="submit"
                              value="Create Event"
                              className="bg-blue-600 hover:bg-blue-800"
                         />
                    </form>
               </div>
          </>
     );
};
