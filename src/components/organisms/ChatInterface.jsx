import React, { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../../contexts/AuthContext';

const socket = io('http://localhost:3000'); // Update to match your server's address

const ChatInterface = ({ groupId }) => {
    const { user } = useContext(AuthContext); // Assuming AuthContext provides user details
    const [messages, setMessages] = useState([]); // Store chat messages
    const [newMessage, setNewMessage] = useState(''); // Store the input message
    const [error, setError] = useState(null); // Store errors

    // Join group and fetch chat history when component mounts
    useEffect(() => {
        if (!groupId) {
            setError('Invalid group ID.');
            return;
        }

        // Join the group
        socket.emit('joinGroup', groupId);

        // Listen for incoming messages
        socket.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Listen for chat history
        socket.on('chatHistory', (history) => {
            setMessages(history);
        });

        // Handle errors
        socket.on('connect_error', (err) => {
            setError('Failed to connect to the chat server.');
            console.error('Socket connection error:', err);
        });

        // Cleanup on unmount
        return () => {
            socket.emit('leaveGroup', groupId);
            socket.off('receiveMessage');
            socket.off('chatHistory');
            socket.disconnect();
        };
    }, [groupId]);

    // Send a new message
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

        // Emit the message to the server
        socket.emit('sendMessage', message, (ack) => {
            if (ack?.error) {
                setError(ack.error);
                console.error('Message send error:', ack.error);
            } else {
                setNewMessage('');
            }
        });
    };

    return (
        <div className="chat-container">
            <h2>Group Chat</h2>
            {error && <p className="error">{error}</p>}

            {/* Chat messages */}
            <div className="chat-messages" style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                {messages.map((msg, idx) => (
                    <div key={idx} className="message">
                        <strong>{msg.sender?.firstname || 'Unknown User'}:</strong> {msg.content}
                        <span style={{ fontSize: '0.8rem', color: '#888' }}> ({new Date(msg.timestamp).toLocaleTimeString()})</span>
                    </div>
                ))}
            </div>

            {/* Message input */}
            <div className="chat-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="chat-input-box"
                    style={{ width: '80%', padding: '10px', marginRight: '10px' }}
                />
                <button
                    onClick={sendMessage}
                    className="chat-send-button"
                    style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px' }}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatInterface;
