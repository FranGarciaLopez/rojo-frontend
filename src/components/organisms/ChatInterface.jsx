import React, { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../../contexts/AuthContext';

const socket = io('http://localhost:3000'); // Asegúrate de que la URL sea correcta

const ChatInterface = ({ groupId }) => {
    const { user } = useContext(AuthContext);
    const [messages, setMessages] = useState([]); // Mensajes del chat
    const [newMessage, setNewMessage] = useState(''); // Mensaje que se escribe
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!groupId) {
            setError('Invalid group ID.');
            return;
        }

        // Unirse al grupo
        socket.emit('joinGroup', groupId);

        // Cargar historial de mensajes
        socket.on('chatHistory', (history) => {
            setMessages(history || []);
        });

        // Escuchar mensajes nuevos
        socket.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Manejar errores de conexión
        socket.on('connect_error', (err) => {
            setError('Failed to connect to the chat server.');
        });

        // Limpiar cuando el componente se desmonte
        return () => {
            socket.emit('leaveGroup', groupId);
            socket.off('chatHistory');
            socket.off('receiveMessage');
        };
    }, [groupId]);

    // Enviar mensaje
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

        // Emitir mensaje
        socket.emit('sendMessage', message, (ack) => {
            if (ack?.error) {
                setError(ack.error);
            } else {
                setNewMessage('');
            }
        });
    };

    return (
        <div className="chat-container">
            <h2>Group Chat</h2>
            {error && <p className="error">{error}</p>}

            {/* Mostrar mensajes */}
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
                <div className="chat-messages overflow-y-auto max-h-80">
                    {messages.map((msg) => (
                        <div key={msg._id} className="mb-2">
                            <strong className="text-blue-600">
                            {msg.author?.firstname + " " + msg.author?.lastname|| 'Unknown User'}:

                            </strong>{' '}
                            {msg.content}
                            <span className="text-gray-500 text-sm ml-2">
                                {new Date(msg.timestamp).toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>

            </div>

            {/* Entrada de mensaje */}
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
