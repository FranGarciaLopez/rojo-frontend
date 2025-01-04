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

    const baseURL = import.meta.env.VITE_API_BASE_URL;

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
                `${baseURL}/photos/upload`,
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
                    `${baseURL}/events/eventregister`,
                    formDataEvent,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (eventResponse.status === 201) {
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
                const response = await axios.get(`${baseURL}/cities/cities`);
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
                const response = await axios.get(`${baseURL}/categories/categories`);
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
            <div className="h-16"></div> {/* Spacer to prevent overlap */}
            <div className="mx-auto px-5 h-screen justify-center items-center flex flex-col gap-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
                    <InputText
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
                        required
                    />
                    <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
                        required
                    >
                        <option value="">Choose your City</option>
                        {cities.map((city) => (
                            <option key={city._id} value={city.name}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
                        required
                    >
                        <option value="">Choose a Category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                    <textarea
                        rows="5"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
                        required
                    />
                    <input
                        type="datetime-local"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
                        required
                    />
                    <UploadImage setPhotos={setPhotos} />
                    <Buttons
                        type="submit"
                        value="Create Event"
                        className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                    />
                </form>
            </div>
        </>
    );
};
