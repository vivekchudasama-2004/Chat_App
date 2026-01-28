import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { FaSearch, FaEllipsisV } from 'react-icons/fa';
import ChatInput from './ChatInput';
import MessageItem from './MessageItem';
import { fetchMessages, sendMessage } from '../../../services/apiObject';
import { io } from 'socket.io-client';

const ENDPOINT = "http://localhost:3001"; // Or your backend URL

const ChatWindow = ({ currentUser, selectedUser }) => {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const messagesEndRef = useRef(null);

    // Socket Connection Management
    useEffect(() => {
        console.log("Initializing socket...");
        const newSocket = io(ENDPOINT, {
            reconnection: true,
            reconnectionAttempts: 5
        });

        newSocket.on('connect', () => {
            console.log("Socket connected:", newSocket.id);
            setIsConnected(true);
            // Re-join room if already selected
            if (selectedUser && currentUser) {
                const room = [currentUser.uid, selectedUser.id].sort().join('_');
                console.log("Joining room after connect:", room);
                newSocket.emit('join_conversation', room);

                // Add a temporary system message to indicate connection? 
                // Alternatively, relying on the green badge in header is cleaner.
            }
        });

        newSocket.on('disconnect', () => {
            console.log("Socket disconnected");
            setIsConnected(false);
        });

        newSocket.on('connect_error', (err) => {
            console.error("Socket connection error:", err);
        });

        newSocket.on('receive_message', (newMessage) => {
            console.log("Received new message via socket:", newMessage);
            setMessages((prev) => [...prev, newMessage]);
        });

        setSocket(newSocket);

        return () => {
            console.log("Cleaning up socket...");
            newSocket.disconnect();
        };
    }, [currentUser]); // Re-connect only if currentUser changes (identity switch)

    // Room Management when selectedUser changes
    useEffect(() => {
        if (!socket || !socket.connected || !selectedUser || !currentUser) return;

        const room = [currentUser.uid, selectedUser.id].sort().join('_');
        console.log("Switching room to:", room);
        socket.emit('join_conversation', room);

    }, [selectedUser, currentUser, socket]);

    // Fetch History
    useEffect(() => {
        const loadMessages = async () => {
            if (selectedUser?.id && currentUser) {
                const room = [currentUser.uid, selectedUser.id].sort().join('_');
                console.log("Fetching messages API for room:", room);
                try {
                    const history = await fetchMessages(room);
                    console.log("Fetched history length:", history.length);
                    setMessages(history);
                } catch (e) {
                    console.error("Error fetching history", e);
                }
            }
        };
        loadMessages();
    }, [selectedUser, currentUser]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);


    const handleSend = async (text) => {
        if (!selectedUser || !text.trim()) return;

        const room = [currentUser.uid, selectedUser.id].sort().join('_');
        const messageData = {
            conversationId: room,
            content: text,
            senderId: currentUser.uid,
            type: 'text'
        };

        try {
            console.log("Sending message API:", messageData);
            await sendMessage(messageData);
            // Note: We rely on socket 'receive_message' to update UI
        } catch (error) {
            console.error("Failed to send", error);
        }
    };

    if (!selectedUser) {
        return (
            <div className="h-100 d-flex align-items-center justify-content-center text-muted">
                Select a user to start chatting
            </div>
        );
    }

    // Format for display
    // Map backend message format to UI format if needed
    // Backend: { content, senderId, message_at, ... }
    // UI expects: { id, content, sender, time, isMe, type... }

    const uiMessages = messages.map((msg, index) => {
        let messageTime = '';
        if (msg.message_at) {
            // Handle Firestore Timestamp (seconds/nanoseconds) or standard Date/string
            const dateObj = msg.message_at.seconds
                ? new Date(msg.message_at.seconds * 1000)
                : new Date(msg.message_at);

            if (!isNaN(dateObj.getTime())) {
                messageTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            } else {
                messageTime = 'Invalid Date';
            }
        }

        return {
            id: msg.messageId || index,
            content: msg.content,
            sender: msg.senderId === currentUser.uid ? 'Me' : selectedUser.user.name,
            time: messageTime,
            isMe: msg.senderId === currentUser.uid,
            type: msg.type || 'text',
        };
    });

    return (
        <div className="d-flex flex-column h-100">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light bg-opacity-10">
                <div className="d-flex align-items-center">
                    {selectedUser.user.avatar && !selectedUser.user.avatar.includes('via.placeholder') ? (
                        <img
                            src={selectedUser.user.avatar}
                            alt={selectedUser.user.name}
                            className="rounded-circle me-3 border"
                            style={{ width: '40px', height: '40px' }}
                        />
                    ) : (
                        <div
                            className="rounded-circle me-3 bg-secondary d-flex align-items-center justify-content-center text-white"
                            style={{ width: '40px', height: '40px' }}
                        >
                            <span className="fs-6">{selectedUser.user.name.substring(0, 2).toUpperCase()}</span>
                        </div>
                    )}

                    <h6 className="mb-0 fw-bold">{selectedUser.user.name}</h6>
                </div>

                {/* Debug Info Removed */}

                <div>
                    <Button variant="link" className="text-secondary shadow-none"><FaSearch /></Button>
                    <Button variant="link" className="text-secondary shadow-none"><FaEllipsisV /></Button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-grow-1 overflow-auto p-4 bg-white" style={{ scrollBehavior: 'smooth' }}>
                {uiMessages.map((msg) => (
                    <MessageItem key={msg.id} message={msg} isMe={msg.isMe} />
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <ChatInput onSend={handleSend} />
        </div>
    );
};

export default ChatWindow;
