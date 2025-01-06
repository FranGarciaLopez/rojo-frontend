import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../../api/apiService";
import { AuthContext } from "../../contexts/AuthContext";
import NavBar from "../molecules/NavBar";
import ChatInterface from "./ChatInterface";
import EventDetails from "../molecules/EventDetails";
import { EventDetailsSkeleton } from "../skeletons/EventDetailsSkeleton";

export const EventGroupPage = () => {
  const { eventId, groupId } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEventById(authToken, eventId);
        setEvent(response.data);
      } catch (err) {
        console.error("Error fetching event data:", err);
        setError("Failed to fetch event details.");
      }
    };

    fetchData();
  }, [eventId, authToken]);

  return (
    <>
      <NavBar />
      <div className="max-w-5xl mx-auto p-4">
        {event ? (
          <EventDetails event={event} />
        ) : (
          <EventDetailsSkeleton />
        )}

        {/* Chat interface */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg mt-5">
          <ChatInterface groupId={groupId} />
        </div>
      </div>
    </>
  );
};
