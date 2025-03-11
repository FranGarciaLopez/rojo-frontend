import React, { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { getEventById } from "../../api/apiService"
import { AuthContext } from "../../contexts/AuthContext"
import NavBar from "../molecules/NavBar"
import ChatInterface from "./ChatInterface"
import EventDetails from "../molecules/EventDetails"
import { EventDetailsSkeleton } from "../skeletons/EventDetailsSkeleton"

export const EventGroupPage = () => {
  const { eventId, groupId } = useParams()
  const [event, setEvent] = useState(null)
  const [error, setError] = useState(null)
  const { authToken } = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState("details") // New state for tabs

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEventById(authToken, eventId)
        setEvent(response.data)
      } catch (err) {
        console.error("Error fetching event data:", err)
        setError("Failed to fetch event details.")
      }
    }

    fetchData()
  }, [eventId, authToken])

  return (
    <>
      <NavBar />
      <div className="max-w-7xl mx-auto p-4">
        {/* Tab Header */}
        <div className="flex border-b border-gray-300">
          <div
            className={`px-4 py-2 cursor-pointer ${activeTab === "details"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-blue-600 transform hover:scale-105"
              }`}
            onClick={() => setActiveTab("details")}
          >
            Event Details
          </div>
          <div
            className={`px-4 py-2 cursor-pointer ${activeTab === "chat"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-blue-600 transform hover:scale-105"
              }`}
            onClick={() => setActiveTab("chat")}
          >
            Chat
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === "details" && (
            <>
              {event ? (
                <EventDetails event={event} />
              ) : (
                <EventDetailsSkeleton />
              )}
            </>
          )}

          {activeTab === "chat" && (
            <div className="p-4 rounded-lg shadow-lg mt-5">
              <ChatInterface groupId={groupId} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
