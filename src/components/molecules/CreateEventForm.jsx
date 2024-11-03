

import React, { useState, useRef , useEffect} from 'react';

import axios from 'axios';

import * as SubframeCore from "@subframe/core";

import  InputText from "../atoms/InputText";

import Buttons from '../atoms/Buttons';
export const CreateEvent = () => {
  const [photos, setPhotos] = useState([]);
  const [eventData, setEventData] = useState({});

  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cities, setCities] = useState([]);
  const [dateTime, setDateTime] = useState('')
  const [city, setCity] = useState('');

  const[category, setCategory]= useState([]);
  const[categories, setCategories]= useState([]);

  const refs = {
    title: useRef(null),
    city: useRef(null), 
  };// Asegúrate de inicializar otros datos del evento

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    
  
    photos.forEach(photo => {
      formData.append('photos', photo);
    });

 
    formData.append('title', eventData.title);
   
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


 /* useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/'); 
        setCategories(response.data); 
      } catch (error) {
        console.error('Error fetching categories:',  error.message);
      }
    };

    fetchCategories();
  }, []);*/
    
  
  return (
    <div className="flex h-full w-full min-w-[768px] flex-col items-center gap-6 bg-default-background px-6 py-6 mobile:h-full mobile:w-full">
      
      
      <div className="flex w-full items-center gap-2">
      
  <i
    className="fas fa-arrow-left cursor-pointer"
    onClick={() => window.history.back()}
  ></i>

          
        <span className="font-heading-5 font-bold text-default-font"> Create New Event</span>
      </div>
     

      <div className="flex w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed border-brand-600 px-6 py-6">
        <div className="flex w-full items-center gap-2 border-b border-solid border-neutral-border px-6 py-6">
          <span className="text-heading-3 font-bold text-default-font">Add details</span>
          <span className="text-body font-body font-bold text-subtext-color">tags, source, comments</span>
        </div>
        <div className="flex w-full flex-col items-start gap-6 px-6 py-6">
        <span className="text-body-bold font-body-bold text-default-font">Title</span>
          <InputText
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 min-w-[400px]"
            required
          />
          <div className="flex w-full flex-col items-start gap-2">
            <div className="flex w-full items-center gap-2">
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
          
        
           
          </div>
        
          <select
                                                                     
                                                                     value={category}
                                                                     onChange={(e) => setCategory(e.target.value)}
                                                                     ref={refs.category}
                                                                     className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
                                                                     required
                                                                     >
                                                                       <option value="">     Choose a Category    </option>
                                                                       {categories.map((category) =>(
                                                                           <option key ={category._id} value={category.name}>
                                                                               {category.name}
                                                                           </option>
                                                                       ))}
              
                                                                     </select>
                                                            
          <div className="flex w-full flex-col items-start gap-2">
            <span className="text-body-bold font-body-bold text-default-font">Comment</span>
            <textarea
            rows="5"
            cols="50"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 min-w-full"
            required
          />
         </div>
<input
        type="datetime-local" 
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 min-w-[400px]"
        required
      />
       <form onSubmit={handleSubmit} className="flex h-full w-full flex-col items-center gap-6 bg-default-background px-6 py-10 mobile:h-full mobile:w-full">
       
       <SubframeCore.Icon
     className="text-heading-1 font-heading-1 text-brand-700"
     name="FeatherImage"
   />
   <div className="flex flex-col items-center justify-center gap-2">
     <span className="text-body-bold font-body-bold text-default-font text-center">
       Drag photos here
     </span>
     <Buttons
                type="submit"
                value="Upload"
                className="bg-blue-400 hover:bg-blue-200 text-white font-bold py-2 px-4 rounded"
              />
   </div>
   <span className="text-caption font-caption text-subtext-color text-center">
     Supported files: jpg, png, svg
   </span>
       
       </form>

<Buttons
                type="submit"
                value="Create Event"
                className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
              />
          </div>
        </div>
      </div>
    
  
  );
};