import React from "react";

const Card = ({
    activity,
    interestedInAEvent,
    interestedEvents,
    loadingEvent,
}) => {
    const isAlreadyInterested = interestedEvents.includes(activity._id);

    const handleInterestClick = async () => {
        try {
            await interestedInAEvent(activity._id);
        } catch (error) {
            console.error("Error showing interest in event:", error);
        }
    };

    return (
        <div className="relative group overflow-hidden rounded-lg shadow-lg ease-in-out cursor-pointer h-96 w-full">
            {/* Full-Size Background Image */}
            <div
                className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                style={{
                    backgroundImage: `url(${activity.photos[0]
                        .split("/upload/")[0]
                        .concat(
                            "/upload/w_600,h_800,c_fill/"
                        )}${activity.photos[0].split("/upload/")[1]})`,
                }}
            ></div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col justify-between h-full p-4">
                <div>
                    <h2 className="text-xl font-semibold truncate text-gray-200">{activity.title}</h2>
                    <p className="text-sm text-gray-300 line-clamp-2">
                        {activity.description}
                    </p>
                </div>
                <div className="text-xs color-white space-y-1">
                    <p className="text-white">{new Date(activity.dateTime).toLocaleString()}</p>
                    {activity.location?.name && <p className="text-white">{activity.location.name}</p>}
                    {activity.category?.name && <p className="text-white">Category: {activity.category.name}</p>}
                    {activity.city && <p className="text-white">City: {activity.city.name}</p>}
                </div>

                {/* Interested Button */}
                <button
                    onClick={handleInterestClick}
                    disabled={isAlreadyInterested || loadingEvent === activity._id}
                    className={`w-full py-2 mt-4 text-sm font-semibold rounded-lg ${isAlreadyInterested
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                        } transition-colors duration-200`}
                >
                    {loadingEvent === activity._id
                        ? "Processing..."
                        : isAlreadyInterested
                            ? "Already Interested"
                            : "Interested"}
                </button>
            </div>
        </div>
    );
};

export default Card;
