import React, { useEffect, useState, useContext, useRef } from 'react'
import io from 'socket.io-client'
import { AuthContext } from '../../contexts/AuthContext'
import { Card, CardContent } from "@/components/ui/card";
import InputText from '../atoms/InputText'
import Buttons from '../atoms/Buttons'

const baseURL = import.meta.env.VITE_API_BASE_URL

const socket = io(baseURL)

const ChatInterface = ({ groupId }) => {
    const { user } = useContext(AuthContext)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [error, setError] = useState(null)

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        if (!groupId) {
            setError('Invalid group ID.')
            return
        }

        socket.emit('joinGroup', groupId)

        socket.on('chatHistory', (history) => {
            setMessages(history || [])
            scrollToBottom()
        })

        socket.on('receiveMessage', (message) => {
            if (message.sender !== socket.id) {
                setMessages((prevMessages) => [...prevMessages, message])
                scrollToBottom()
            }
        })

        socket.on('connect_error', () => {
            setError('Failed to connect to the chat server.')
        })

        return () => {
            socket.emit('leaveGroup', groupId)
            socket.off('chatHistory')
            socket.off('receiveMessage')
        }
    }, [groupId])

    const sendMessage = () => {
        if (!newMessage.trim()) {
            setError('Cannot send an empty message.')
            return
        }

        const message = {
            groupId,
            userId: user._id,
            content: newMessage,
        }

        const tempMessage = {
            _id: `temp-${Date.now()}`,
            author: {
                firstname: user.firstname,
                lastname: user.lastname,
            },
            content: newMessage,
            timestamp: new Date().toISOString(),
        }

        setMessages((prevMessages) => [...prevMessages, tempMessage])
        scrollToBottom()

        socket.emit('sendMessage', message, (ack) => {
            if (ack?.error) {
                setError(ack.error)
                console.error('Message send error:', ack.error)
            }
        })

        setNewMessage('')
    }

    return (
        <Card className="w-full mx-auto p-6 border-none shadow-none">
            <h2 className="text-2xl font-bold mb-4">Group Chat</h2>

            {error && (
                <div className="text-red-500 text-sm mb-2">
                    {error}
                </div>
            )}

            {/* Chat Messages */}
            <div
                className="h-80 overflow-y-scroll border border-gray-300 p-3 mb-4 rounded"
            >
                {messages.map((msg) => (
                    <div key={msg._id} className="mb-2">
                        <strong className="text-blue-600">
                            {msg.author?.firstname + ' ' + msg.author?.lastname || 'Unknown User'}:
                        </strong>{' '}
                        {msg.content}
                        <span className="text-gray-500 text-xs ml-2">
                            {new Date(msg.timestamp).toLocaleString()}
                        </span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="flex gap-3">
                <InputText
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                />
                <Buttons
                    onClick={sendMessage}
                    value="Send"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
                />
            </div>
        </Card>
    )
}

export default ChatInterface
