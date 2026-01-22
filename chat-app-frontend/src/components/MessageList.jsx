import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MessageList = ({ messages, currentUser, users }) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const formatTime = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp.seconds ? timestamp.seconds * 1000 : timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getUserParams = (uid) => {
        return users.find(u => u.uid === uid) || { username: 'Unknown' };
    }

    return (
        <div className="chat-window" style={{ flex: 1, padding: '20px', overflowY: 'auto', backgroundColor: '#FAFAFA', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <AnimatePresence>
                {messages.map((msg, index) => {
                    const isMe = msg.senderId === currentUser.uid;
                    const senderUser = getUserParams(msg.senderId);

                    return (
                        <motion.div
                            key={msg.messageId || index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            style={{
                                alignSelf: isMe ? 'flex-end' : 'flex-start',
                                maxWidth: '70%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: isMe ? 'flex-end' : 'flex-start'
                            }}
                        >
                            <div style={{
                                backgroundColor: isMe ? '#E8F5E9' : '#F1F1F1',
                                color: '#000',
                                padding: '12px 18px',
                                borderRadius: isMe ? '18px 18px 0 18px' : '18px 18px 18px 0',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
                                position: 'relative',
                                minWidth: '120px'
                            }}>
                                {/* File Display */}
                                {msg.fileBase64 && (
                                    <div style={{ marginBottom: '10px' }}>
                                        {msg.fileType?.startsWith('image/') ? (
                                            <img src={msg.fileBase64} alt="uploaded" style={{ maxWidth: '100%', borderRadius: '8px', border: '1px solid #ddd' }} />
                                        ) : (
                                            <div style={{ backgroundColor: 'rgba(0,0,0,0.05)', padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span style={{ fontSize: '20px' }}>📄</span>
                                                <a
                                                    href={msg.fileBase64}
                                                    download={msg.fileName || 'download'}
                                                    style={{ color: '#2196F3', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}
                                                >
                                                    {msg.fileName || 'Download File'}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {msg.content && <div style={{ fontSize: '15px', lineHeight: '1.4', marginBottom: '4px' }}>{msg.content}</div>}

                                <div style={{ fontSize: '11px', color: '#888', textAlign: isMe ? 'right' : 'left' }}>
                                    {senderUser.username} • {formatTime(msg.message_at)}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
            <div ref={messagesEndRef} />
        </div>
    );
};

export default MessageList;
