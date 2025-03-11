import React from "react"
import { useNavigate } from "react-router-dom"
// Import shadcn components
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const ActivityCard = ({
    activity,
    interestedInAEvent,
    interestedEvents,
    loadingEvent,
}) => {
    const navigate = useNavigate()

    const handleInterestClick = async (e) => {
        e.stopPropagation()
        try {
            await interestedInAEvent(activity._id)
        } catch (error) {
            console.error("Error showing interest in event:", error)
        }
    }

    const handleCardClick = () => {
        navigate(`/events/${activity._id}`) // Navigate to EventDetails
    }

    return (
        <Card
            data-testid="event-card"
            className="overflow-hidden cursor-pointer h-96 w-full mb-8 relative group shadow-lg"
            onClick={handleCardClick}
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                style={{
                    backgroundImage: `url(${activity.photos[0]
                        .split("/upload/")[0]
                        .concat("/upload/w_600,h_800,c_fill/")
                        }${activity.photos[0].split("/upload/")[1]})`,
                }}
            ></div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

            {/* Content Overlay */}
            <CardContent className="relative z-10 flex flex-col justify-between h-full p-4">
                {/* Title and Description */}
                <div>
                    <h2 className="text-xl font-semibold truncate text-gray-200">
                        {activity.title}
                    </h2>
                    <p className="text-sm text-gray-300 line-clamp-2">
                        {activity.description}
                    </p>
                </div>

                {/* Date, City, and Category */}
                <div className="text-xs space-y-1 text-white">
                    <p className="text-white/60">
                        {activity.dateTime
                            ? new Date(activity.dateTime).toLocaleString()
                            : "No Date"}
                    </p>
                    {activity.city?.name && (
                        <p className="text-white/60">City: {activity.city.name}</p>
                    )}
                    {activity.category?.name && (
                        <p className="text-white/60">
                            Category: {activity.category.name}
                        </p>
                    )}
                </div>

                {/* Interested Button */}
                <CardFooter className="p-0 mt-4">
                    <Button
                        onClick={handleInterestClick}
                        disabled={
                            interestedEvents.includes(activity._id) ||
                            loadingEvent === activity._id
                        }
                        className={`w-full ${interestedEvents.includes(activity._id)
                            ? "bg-gray-600 cursor-not-allowed text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                    >
                        {loadingEvent === activity._id
                            ? "Processing..."
                            : interestedEvents.includes(activity._id)
                                ? "Already Interested"
                                : "Interested"}
                    </Button>
                </CardFooter>
            </CardContent>
        </Card>
    )
}

export default ActivityCard
