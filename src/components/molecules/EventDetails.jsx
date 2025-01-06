import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById } from "../../api/apiService";
import { AuthContext } from "../../contexts/AuthContext";
import { EventDetailsSkeleton } from "../skeletons/EventDetailsSkeleton";

const EventDetails = ({ event: propEvent }) => {
    const { id } = useParams(); // Extract ID from URL if not passed as a prop
    const [event, setEvent] = useState(propEvent || null);
    const [loading, setLoading] = useState(!propEvent);
    const [error, setError] = useState(null);
    const { authToken } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (!propEvent && id) {
                try {
                    const response = await getEventById(authToken, id);
                    setEvent(response.data);
                } catch (err) {
                    console.error("Error fetching event data:", err);
                    setError("Failed to fetch event details.");
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [id, authToken, propEvent]);

    if (loading) {
        return <EventDetailsSkeleton />;
    }

    if (error) {
        return <p className="text-center text-lg text-red-500">{error}</p>;
    }

    if (!event) {
        return <p className="text-center text-lg text-red-500">Event not found.</p>;
    }

    const photoUrl = `
    ${event.photos[0]
            .split("/upload/")[0]
            .concat("/upload/w_600,h_800,c_fill/")
        }${event.photos[0].split("/upload/")[1]}
    `;

    return (
        <div className="relative min-h-screen bg-black rounded-lg overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-60"
                style={{
                    backgroundImage: `url(${photoUrl})`,
                }}
            ></div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 flex flex-col space-y-8">
                {/* Back Button */}
                <button
                    className="absolute top-4 left-4 p-4 bg-black/60 text-white rounded-md hover:bg-white hover:text-black transition-colors duration-200"
                    onClick={() => navigate(-1)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                </button>

                {/* Title and Metadata */}
                <div>
                    <h1 className="text-5xl font-extrabold text-white">{event.title}</h1>
                    <div className="mt-4 text-lg">
                        <p className="text-white/60">
                            Date: {event.dateTime ? new Date(event.dateTime).toLocaleString() : "No Date"}
                        </p>
                        <p className="text-white/60">Location: {event.city.name || "No City"}</p>
                        <p className="text-white/60">Category: {event.category.categoryName || "No Category"}</p>
                    </div>
                </div>

                {/* Description */}
                <div className="leading-relaxed text-lg space-y-4">
                    {event.description.split("\n").map((paragraph, index) => (
                        <p className="text-white/80" key={index}>{paragraph}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
