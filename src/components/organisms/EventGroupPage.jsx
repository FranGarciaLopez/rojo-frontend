import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from '../../api/apiService';
import { AuthContext } from '../../contexts/AuthContext';
import NavBar from '../molecules/NavBar';
import ChatInterface from './ChatInterface';

export const EventGroupPage = () => {
    const { eventId, groupId } = useParams(); // Extract route parameters
    const [event, setEvent] = useState(null);
    const { authToken } = useContext(AuthContext); // Token from context

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch event details
                const eventData = await getEventById(authToken, eventId);
                setEvent(eventData);
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        fetchData();
    }, [eventId, authToken]);

    return (
        <>
        <NavBar />
        <div className="max-w-4xl mx-auto py-8">
            {event && (
                <div className="mb-4">
                    <h1 className="text-2xl font-bold">{event.title}</h1>
                    <p className="text-gray-600">{event.description}</p>
                </div>
            )}

            {/* ChatInterface para manejar el chat del grupo */}
            <div className="chat-container bg-gray-100 p-4 rounded-lg shadow-lg">
                <ChatInterface groupId={groupId} />
            </div>
        </div>
        </>
    );
};
