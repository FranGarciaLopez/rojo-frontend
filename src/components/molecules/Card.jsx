import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({
  activity,
  interestedInAEvent,
  interestedEvents,
  loadingEvent,
}) => {
  const navigate = useNavigate();

  const handleInterestClick = async (e) => {
    e.stopPropagation(); // Prevent navigation when clicking the button
    try {
      await interestedInAEvent(activity._id);
    } catch (error) {
      console.error("Error showing interest in event:", error);
    }
  };

  const handleCardClick = () => {
    navigate(`/events/${activity._id}`); // Navigate to EventDetails
  };

  const photoUrl = activity.photos?.[0] || "https://via.placeholder.com/150";

  return (
    <div
      className="relative group overflow-hidden rounded-lg shadow-lg ease-in-out cursor-pointer h-96 w-full mb-8"
      onClick={handleCardClick}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-transform duration-500 group-hover:scale-110"
        style={{
          backgroundImage: `url(${photoUrl})`,
        }}
      ></div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col justify-between h-full p-4">
        <div>
          <h2 className="text-xl font-semibold truncate text-gray-200">
            {activity.title}
          </h2>
          <p className="text-sm text-gray-300 line-clamp-2">
            {activity.description}
          </p>
        </div>
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
            <p className="text-white/60">Category: {activity.category.name}</p>
          )}
        </div>

        {/* Interested Button */}
        <button
          onClick={handleInterestClick}
          disabled={
            interestedEvents.includes(activity._id) ||
            loadingEvent === activity._id
          }
          className={`w-full py-2 mt-4 text-sm font-semibold rounded-lg ${
            interestedEvents.includes(activity._id)
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loadingEvent === activity._id
            ? "Processing..."
            : interestedEvents.includes(activity._id)
            ? "Already Interested"
            : "Interested"}
        </button>
      </div>
    </div>
  );
};

export default Card;