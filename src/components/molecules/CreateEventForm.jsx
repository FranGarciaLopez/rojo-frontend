import React, { useState, useRef, useEffect } from "react";

import axios from "axios";

import * as SubframeCore from "@subframe/core";
import NavBar from '../molecules/NavBar';
import InputText from "../atoms/InputText";

import UploadImage from "../molecules/UploadImage";
import { useNavigate } from 'react-router-dom';

import Buttons from "../atoms/Buttons";
export const CreateEvent = () => {
    const [photos, setPhotos] = useState([]);

    const [error, setError] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [cities, setCities] = useState([]);
    const [dateTime, setDateTime] = useState("");
    const [city, setCity] = useState("");

    const [category, setCategory] = useState([]);
    const [categories, setCategories] = useState([]);

    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
  
   
    const refs = {
        title: useRef(null),
        city: useRef(null),
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!photos || photos.length === 0) {
            setError("Please upload at least one photo.");
            return;
        }

        const formDataPhotos = new FormData();
        photos.forEach((photo) => {
            formDataPhotos.append("photos", photo);
        });

        try {
            setIsUploading(true);

            const photoResponse = await axios.post(
                "http://localhost:3000/photos/upload",
                formDataPhotos,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentage = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setUploadProgress(percentage);
                    },
                }
            );

            if (photoResponse.status === 200) {
                const uploadedPhotos = photoResponse.data.urls;

                const formDataEvent = {
                    title,
                    city,
                    description,
                    dateTime,

                    category,

                    photos: uploadedPhotos,
                };

                const eventResponse = await axios.post(
                    "http://localhost:3000/events/eventregister",
                    formDataEvent,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (eventResponse.status === 201) {
                    console.log("Event created successfully");
                    setUploadSuccess(true);

                    setTitle('');
                    setCity('');
                    setDescription('');
                    setDateTime('');
                    setCategory('');
                    setPhotos([]); 
                    setError(null); 



                    setTimeout(() => {
                        navigate('/admin');
                    }, 3000);
                  

                }
            }
        } catch (error) {

            setError(error.message || "An unexpected error occurred");
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get("http://localhost:3000/cities/cities");
                setCities(response.data);
            } catch (error) {
                console.error("Error fetching cities:", error.message);
            }
        };

        fetchCities();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:3000/categories/categories");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error.message);
            }
        };

        fetchCategories();
    }, []);

    return (
        <>
            <NavBar />
            <div className="centered-elements">
                <div className="flex flex-col h-full p-6 gap-6 xl:flex-row">
                    <form onSubmit={handleSubmit}>
                        <div className="w-full items-center gap-2">
                            <i
                                className="fas fa-arrow-left cursor-pointer"
                                onClick={() => window.history.back()}
                            ></i>

                            <span className="font-heading-5 font-bold text-default-font">
                                {" "}
                                Create New Event
                            </span>
                        </div>

                        <div className="flex w-full flex-col items-center justify-center gap-2 rounded-md px-6 py-6">
                            <div className="flex w-full items-center gap-2 border-b border-solid border-neutral-border px-6 py-6">
                                <span className="text-heading-3 font-bold text-default-font">
                                    Add details
                                </span>
                                <span className="text-body font-body font-bold text-subtext-color">
                                    tags, source, comments
                                </span>
                            </div>
                            <div className="flex w-full flex-col items-start gap-6 px-6 py-6">
                                <span className="text-body-bold font-body-bold text-default-font">
                                    Title
                                </span>
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
                                            <option value=""> Choose your City </option>
                                            {cities.map((city) => (
                                                <option key={city._id} value={city.name}>
                                                    {city.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <select

                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        ref={refs.category}
                                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
                                        required
                                    >
                                        <option value="">     Choose a Category    </option>
                                        {categories.map((category) => (
                                            <option key={category._id} value={category._id}>
                                                {category.categoryName}
                                            </option>
                                        ))}

                                    </select>
                                </div>

                                <div className="flex w-full flex-col items-start gap-2">
                                    <span className="text-body-bold font-body-bold text-default-font">
                                        Comment
                                    </span>
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
                                <form className="flex h-full w-full flex-col items-center gap-6 bg-default-background px-6 py-10 mobile:h-full mobile:w-full">
                                    <SubframeCore.Icon
                                        className="text-heading-1 font-heading-1 text-brand-700"
                                        name="FeatherImage"
                                    />
                                    <UploadImage setPhotos={setPhotos} />
                                </form>

                                <Buttons
                                    type="submit"
                                    value="Create Event"
                                    className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                                />

                                {isUploading && (
                                    <div>
                                        <div className="progress-bar" style={{ width: `${uploadProgress}%` }} />
                                        <div className="progress-text">{uploadProgress}%</div>
                                    </div>
                                )}
                                {uploadSuccess && (
                                    <div className="text-green-500">
                                        Photos uploaded successfully!
                                        
                  </div>
                                )}
                                {error && <div className="text-red-500">{error}</div>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
