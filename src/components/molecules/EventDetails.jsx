import React, { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getEventById } from "../../api/apiService"
import { AuthContext } from "../../contexts/AuthContext"
import { EventDetailsSkeleton } from "../skeletons/EventDetailsSkeleton"
import { Card } from "@/components/ui/card";
import Buttons from "../atoms/Buttons" // Custom Button component

const EventDetails = ({ event: propEvent }) => {
    const { id } = useParams()
    const [event, setEvent] = useState(propEvent || null)
    const [loading, setLoading] = useState(!propEvent)
    const [error, setError] = useState(null)
    const { authToken } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            if (!propEvent && id) {
                try {
                    const response = await getEventById(authToken, id)
                    setEvent(response.data)
                } catch (err) {
                    console.error("Error fetching event data:", err)
                    setError("Failed to fetch event details.")
                } finally {
                    setLoading(false)
                }
            }
        }

        fetchData()
    }, [id, authToken, propEvent])

    if (loading) return <EventDetailsSkeleton />

    if (error) {
        return <p className="text-center text-lg text-red-500">{error}</p>
    }

    if (!event) {
        return <p className="text-center text-lg text-red-500">Event not found.</p>
    }

    const photoUrl = `
    ${event.photos[0]
            .split("/upload/")[0]
            .concat("/upload/ar_16:9,c_fill/")
        }${event.photos[0].split("/upload/")[1]}
  `

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
            <div className="relative z-10 mx-auto px-6 py-16">
                {/* Back Button */}
                <Buttons
                    onClick={() => navigate(-1)}
                    value={
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
                    }
                    className="absolute top-4 left-4 bg-black/60 hover:bg-white text-white hover:text-black rounded-md transition-colors duration-200 p-4"
                />

                {/* Event Card */}
                <Card className="bg-black/60 text-white rounded-lg overflow-hidden shadow-lg">
                    <div>
                        {/* Title and Metadata */}
                        <div>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold">{event.title}</h1>
                            <div className="mt-4 text-lg md:text-xl lg:text-2xl flex flex-col items-center justify-start
                            md:flex-row md:justify-between gap-4">

                                <p className="text-white/60">
                                    Date: {event.dateTime ? new Date(event.dateTime).toLocaleString() : "No Date"}
                                </p>
                                <p className="text-white/60">
                                    Location: {event.city?.name || "No City"}
                                </p>
                                <p className="text-white/60">
                                    Category: {event.category?.categoryName || "No Category"}
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="leading-relaxed text-lg md:text-xl lg:text-2xl mt-6">
                            {event.description.split("\n").map((paragraph, index) => (
                                <p className="text-white/80" key={index}>
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default EventDetails
