import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import NavBar from "../molecules/NavBar";
import InputText from "../atoms/InputText";
import UploadImage from "../molecules/UploadImage";
import { useNavigate } from "react-router-dom";
import Buttons from "../atoms/Buttons";
import { AuthContext } from "../../contexts/AuthContext";

export const CreateEvent = () => {
    const { user, authToken } = useContext(AuthContext);
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [cities, setCities] = useState([]);
    const [dateTime, setDateTime] = useState("");
    const [city, setCity] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    const uploadImage = async () => {
        if (!photos || photos.length === 0) {
            setError("Please upload at least one photo.");
            return null;
        }

        const formDataPhotos = new FormData();
        photos.forEach((photo) => {
            formDataPhotos.append("photos", photo);
        });

        try {
            setIsUploading(true);
            const response = await axios.post(`${baseURL}/photos/upload`, formDataPhotos, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progressEvent) => {
                    const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentage);
                },
            });

            if (response.status === 200) {
                const uploadedUrls = response.data.urls;
                return uploadedUrls;
            } else {
                setError("Failed to upload images.");
                return null;
            }
        } catch (error) {
            console.error("Error uploading images:", error);
            setError("An error occurred while uploading images.");
            return null;
        } finally {
            setIsUploading(false);
        }
    };

    const createEvent = async (uploadedPhotos) => {
        try {
            const formDataEvent = {
                title,
                city,
                description,
                dateTime,
                category,
                photos: uploadedPhotos,
                administrator: user._id,
            };

            const response = await axios.post(`${baseURL}/events/eventregister`, formDataEvent, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (response.status === 201) {
                setTitle("");
                setCity("");
                setDescription("");
                setDateTime("");
                setCategory("");
                setPhotos([]);
                setError(null);
                navigate("/admin");
            } else {
                setError("Failed to create event.");
            }
        } catch (error) {
            console.error("Error creating event:", error);
            setError("An error occurred while creating the event.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const uploadedPhotos = await uploadImage();
        if (!uploadedPhotos || uploadedPhotos.length === 0) {
            setError("Please upload at least one photo.");
            return;
        }

        await createEvent(uploadedPhotos);
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
            <div className="h-16"></div> {/* Spacer */}
            <div className="container mx-auto px-6 py-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                        <i
                            className="fas fa-arrow-left cursor-pointer text-gray-600 hover:text-gray-800"
                            onClick={() => window.history.back()}
                        ></i>
                        <h1 className="text-2xl font-bold text-gray-800">Create New Event</h1>
                    </div>
                        <InputText
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full"
                            required
                        />
                        <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="bg-gray-100 border border-gray-300 rounded-lg p-2.5 w-full"
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
                            className="bg-gray-100 border border-gray-300 rounded-lg p-2.5 w-full"
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
                            rows="4"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-gray-100 border border-gray-300 rounded-lg p-2.5 w-full"
                            required
                        />
                        <input
                            type="datetime-local"
                            value={dateTime}
                            onChange={(e) => setDateTime(e.target.value)}
                            className="bg-gray-100 border border-gray-300 rounded-lg p-2.5 w-full"
                            required
                        />
                        <UploadImage setPhotos={setPhotos} />
                        <Buttons
                            type="submit"
                            value={isUploading ? "Uploading..." : "Create Event"}
                            className={`bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded ${isUploading ? "cursor-not-allowed opacity-50" : ""
                                }`}
                            disabled={isUploading}
                        />
                    </form>
                    {error && <p className="text-red-600 mt-4">{error}</p>}
                </div>
        </>
    );
};
