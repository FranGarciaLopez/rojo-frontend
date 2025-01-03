import React, { useEffect, useState, useContext, useRef } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../../contexts/AuthContext';
const baseURL = import.meta.env.VITE_API_BASE_URL;

const socket = io(baseURL);

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

        socket.emit('joinGroup', groupId);

        socket.on('chatHistory', (history) => {
            setMessages(history || []);
            scrollToBottom();
        });

        socket.on('receiveMessage', (message) => {
            if (message.sender !== socket.id) {
                setMessages((prevMessages) => [...prevMessages, message]);
                scrollToBottom();
            }
        });

        socket.on('connect_error', () => {
            setError('Failed to connect to the chat server.');
        });

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

        const tempMessage = {
            _id: `temp-${Date.now()}`, 
            author: {
                firstname: user.firstname, 
                lastname: user.lastname,  
            },
            content: newMessage,
            timestamp: new Date().toISOString(),
        };

        setMessages((prevMessages) => [...prevMessages, tempMessage]);
        scrollToBottom();

        socket.emit('sendMessage', message, (ack) => {
            if (ack?.error) {
                setError(ack.error);
                console.error('Message send error:', ack.error);
            }
        });

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
