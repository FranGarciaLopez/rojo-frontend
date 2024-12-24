import React, { useEffect, useState, useContext, useRef } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../../contexts/AuthContext';

// Use the backend's deployed URL for production
const socket = io('http://localhost:3000'); // Replace with your deployed backend URL

const ChatInterface = ({ groupId }) => {
    const { user } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [error, setError] = useState(null);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (!groupId) {
            setError('Invalid group ID.');
            return;
        }

        // Join the group
        socket.emit('joinGroup', groupId);

        // Fetch chat history
        socket.on('chatHistory', (history) => {
            setMessages(history || []);
            scrollToBottom();
        });

        // Listen for new messages and avoid duplicates
        socket.on('receiveMessage', (message) => {
            if (message.sender !== socket.id) { // Avoid displaying messages sent by this user
                setMessages((prevMessages) => [...prevMessages, message]);
                scrollToBottom();
            }
        });

        // Handle connection errors
        socket.on('connect_error', () => {
            setError('Failed to connect to the chat server.');
        });

        // Clean up on unmount
        return () => {
            socket.emit('leaveGroup', groupId);
            socket.off('chatHistory');
            socket.off('receiveMessage');
        };
    }, [groupId]);

    const sendMessage = () => {
        if (!newMessage.trim()) {
            setError('Cannot send an empty message.');
            return;
        }

        const message = {
            groupId,
            userId: user._id,
            content: newMessage,
        };

        // Optimistically update the UI with user details
        const tempMessage = {
            _id: `temp-${Date.now()}`, // Temporary ID for the message
            author: {
                firstname: user.firstname, // Use user's firstname
                lastname: user.lastname,   // Use user's lastname
            },
            content: newMessage,
            timestamp: new Date().toISOString(), // Generate current timestamp
        };

        // Add the message optimistically to the local messages state
        setMessages((prevMessages) => [...prevMessages, tempMessage]);
        scrollToBottom();

        // Emit the message to the server
        socket.emit('sendMessage', message, (ack) => {
            if (ack?.error) {
                setError(ack.error);
                console.error('Message send error:', ack.error);
            }
        });

        // Clear the input field
        setNewMessage('');
    };

    return (
        <div className="chat-container">
            <h2>Group Chat</h2>
            {error && <p className="error">{error}</p>}

            {/* Chat Messages */}
            <div
                className="chat-messages"
                style={{
                    height: '300px',
                    overflowY: 'scroll',
                    border: '1px solid #ccc',
                    padding: '10px',
                    marginBottom: '10px',
                }}
            >
                {messages.map((msg) => (
                    <div key={msg._id} className="mb-2">
                        <strong className="text-blue-600">
                            {msg.author?.firstname + ' ' + msg.author?.lastname || 'Unknown User'}:
                        </strong>{' '}
                        {msg.content}
                        <span className="text-gray-500 text-sm ml-2">
                            {new Date(msg.timestamp).toLocaleString()}
                        </span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="chat-input flex flex-row gap-5">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="chat-input-box"
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatInterface;
