import React, { useEffect, useState, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { getEventById } from '../../api/apiService';
import { AuthContext } from '../../contexts/AuthContext';

export const EventGroupPage = () => {
    const { eventId, groupId } = useParams(); // Extract route parameters
    const [event, setEvent] = useState(null);
    const [group, setGroup] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const { user, authToken } = useContext(AuthContext); // User and token from context
    const socket = useRef(null); // Use ref to manage socket instance
    const messagesEndRef = useRef(null); // Ref for scrolling to the bottom

    // Scroll to the latest message
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch event details
                const eventData = await getEventById(authToken, eventId);
                setEvent(eventData);

                // Fetch group details including messages
                const groupResponse = await fetch(`http://localhost:3000/groups/findgroupbyid/${groupId}`, {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                const groupData = await groupResponse.json();
                setGroup(groupData);
                setMessages(groupData.messages || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        // Initialize socket connection
        socket.current = io('http://localhost:3000');

        // Join the group chat
        socket.current.emit('joinGroup', groupId);

        // Handle incoming messages
        socket.current.on('receiveMessage', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            // Leave the group chat and clean up
            socket.current.emit('leaveGroup', groupId);
            socket.current.disconnect();
        };
    }, [eventId, groupId, authToken]);

    useEffect(() => {
        // Scroll to the latest message whenever messages update
        scrollToBottom();
    }, [messages]);

    const sendMessage = () => {
        if (!message.trim()) {
            console.error("Message content is required.");
            return;
        }

        const userId = user._id;
        // Emit the message to the server
        socket.current.emit(
            'sendMessage',
            { groupId, content: message, userId },
            (ack) => {
                if (ack?.error) {
                    console.error("Error sending message:", ack.error);
                }
            }
        );

        setMessage(''); // Clear the input field
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            {event && (
                <div className="mb-4">
                    <h1 className="text-2xl font-bold">{event.title}</h1>
                    <p className="text-gray-600">{event.description}</p>
                </div>
            )}

            <div className="chat-container bg-gray-100 p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Group Chat</h2>
                <div className="chat-messages overflow-y-auto max-h-80">
                    {messages.map((msg, index) => (
                        <div key={index} className="mb-2">
                            <strong className="text-blue-600">
                                {msg.author?.firstname || 'Unknown User'} {msg.author?.lastname || ''}:
                            </strong>{' '}
                            {msg.content}
                            <span className="text-gray-500 text-sm ml-2">
                                {new Date(msg.timestamp).toLocaleString()}
                            </span>
                        </div>
                    ))}
                    <div ref={messagesEndRef} /> {/* For scrolling */}
                </div>
                <div className="mt-4 flex items-center space-x-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={sendMessage}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};
